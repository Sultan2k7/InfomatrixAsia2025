'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function Co2Home() {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    // Handle sending the inputValue to your AI assistant
    console.log('Sent message:', inputValue);
    setInputValue(''); // Clear the input field after sending
  };

  return (
    <div className='assistant'>
      <div className="flex justify-between items-center">
        <h1 className='text-3xl font-bold mb-6'>Ассистент</h1>
      </div>

      {/* Input area for AI assistant */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите ваш запрос..."
          className="border rounded-l-md px-4 py-2 w-full bg-transparent text-white placeholder-white border-white"
        />
        <Button
          onClick={handleSend}
          className="rounded-l-none bg-white border-2 border-white hover:bg-white flex items-center justify-center"
        >
          <ArrowUp className="text-black h-5 w-5" /> {/* Black Arrow Icon */}
        </Button>
      </div>
    </div>
  );
}
