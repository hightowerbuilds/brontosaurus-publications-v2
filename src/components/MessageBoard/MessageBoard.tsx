
import './MessageBoard.css'
import { useQuery, useMutation } from '@tanstack/react-query';
import supabase from '../../services/supabase';
import { Messages } from '../../types/message';
import { useState } from 'react';

const getData = async (): Promise<Messages[]> => {
  const { data, error } = await supabase.from('message_board').select('*');
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

  const [ newPost, setNewPost ] = useState('')
  const [ newName, setNewName ] = useState('')
  const { isLoading, error, data } = useMessages(); 
  if (isLoading) {
    return <div>Loading messages...</div>;
  }
  if (error) {
    return <div>Error fetching messages: {error.message}</div>;
  }




  return (
    <div className='messagesMainBox'>
      <h2 className='messageHeading'>Message Board</h2>
        <form>
        <input placeholder='NAME' type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <input placeholder='MESSAGE' type="text" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
        <button type='submit'>Post New message</button>
        </form>
        

      {data?.map((message) => ( 
        <div className='postBox'>
          <p key={message.id}>
            name:{message.name} <br />
            time:{message.created_at} <br />
            post:{message.post} <br />
            userID:{message.user_ID} 
          </p>
        </div>
      ))}
     
    </div>
  );
}

