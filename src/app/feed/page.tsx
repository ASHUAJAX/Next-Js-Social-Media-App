import React from 'react';
import AuthChecker from "@/Components/AuthChecker/AuthChecker";
import Feed from '@/Components/Feed/Feed';

function FeedPage() {
  return (
    <div>
 <AuthChecker Children={<Feed/>} />
    </div>
  )
}

export default FeedPage