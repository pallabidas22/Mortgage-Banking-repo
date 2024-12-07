import { useState, useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';
import { API } from "../constants/api";
import useFetch from "../hooks/useFetch";
import { columns } from '../features/history/transfer/columns';
import { Layout } from 'antd';
const { Content } = Layout;

const TransferHistory = () => {
  const [request, setRequest] = useState(1);
  const { loading, data, error } = useFetch(API.TRANSFER_HISTORY, request);
  const [displayData, setDisplayData] = useState([]);
  
  useEffect(() => {
    if (data?.length) {
      if (request === 1) {
        setDisplayData(data);
      }
      else {
        setDisplayData([...displayData, ...data]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if(error) {
      Modal.error({
        title: 'Something went wrong',
        content: 'Please try again',
      });
    }
  }, [error])


  const handleScroll = (el) => {
    const { scrollTop, scrollHeight, clientHeight } = el.target;
    const isScrolled = scrollHeight - scrollTop - 0.5 === clientHeight;
    if (isScrolled) {
      setRequest(request + 1);
    }
  }

  if (loading && request === 1) return <Spin size="default" fullscreen data-testid="loading" />;

  return (
    <>
      <Content
        style={{ minHeight: '80vh', maxHeight: '80vh', overflowY: 'auto' }}
        // ref={container}
        data-testid="transfer-history"
        onScroll={handleScroll}
      >
        <Table columns={columns} dataSource={displayData} loading={loading || !displayData.length} pagination={false} sticky />
      </Content>
    </>
  )
}

export default TransferHistory;