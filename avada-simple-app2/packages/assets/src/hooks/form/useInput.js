import {useState} from 'react';

/**
 * @param defaultState
 * @returns {[]}
 */
export default function useInput(defaultState = null) {
  const [input1, setInput1] = useState(defaultState);

  const handleInputChange = (key, value) => setInput1(prev => ({...prev, [key]: value}));

  return [input1, handleInputChange, setInput1];
}
