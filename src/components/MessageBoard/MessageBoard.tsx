import { useQuery } from '@tanstack/react-query';
import supabase from '../../services/supabase';
import { Messages } from '../../types/message';

const getData = async (): Promise<Messages[]> => {
  const { data, error } = await supabase.from<Messages>('message_board').select('*');

  if (error) {
    throw error;
  }

  return data || [];
};

const useMessages = () => {
  return useQuery({
    queryKey: ['message_board'], 
    queryFn: getData
  });
};

export default function MessageBoard() {
  const { isLoading, error, data } = useMessages(); 

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error fetching messages: {error.message}</div>;
  }

  return (
    <div>
      <h2>Message Board</h2>
     
      {data?.map((message) => ( <p key={message.id}>{message.post}</p> ))}
     
    </div>
  );
}

