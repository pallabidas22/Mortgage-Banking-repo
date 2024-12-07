import { useEffect, useState, useCallback } from "react";
import { Table } from "antd";

import { AccountHistoryService } from "../../../services/AccountHistoryService";
import { getItem, setItem } from "../../../utils/LocalStorageUtil";
import { AccountHistoryColumns } from "../../../constants/AccountHistoryColumns";

export const HistoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    parseInt(getItem("pageSize") || "10")
  );
  const accountHistoryService = new AccountHistoryService();

  const fetchData = useCallback(
    async (page, size) => {
      setLoading(true);
      try {
        let response = null;

        if (page === 1 && total === 0) {
          response = await accountHistoryService?.getAccountHistory(page);
          setData(response?.data?.data);
          setTotal(parseInt(response?.data?.items, 10));
        } else {
          response = await accountHistoryService?.getAccountHistory(page, size);
          setData(response?.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }

      setLoading(false);
    },
    [total, accountHistoryService] // Add dependencies here
  );

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setItem("pageSize", pagination.pageSize);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(currentPage, pageSize);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPage, pageSize, fetchData]);

  return (
    <>
      <Table
        rowKey="id"
        size="small"
        columns={AccountHistoryColumns}
        dataSource={data}
        scroll={{ y: "calc(100vh - 350px)" }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};
