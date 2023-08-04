import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import "../index.css"
const handleLeft = { left: 10 };
const handleRight = { right: 10}

function Romb({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="romb">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">What if?</label>
        {/* <input id="text" name="text" onChange={onChange} /> */}
      </div>
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Left} id="c" />
    </div>
  );
}

export default Romb;