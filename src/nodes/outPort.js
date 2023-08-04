import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import "../index.css"

function OutPort({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const id = useState(data.id)
  return (
    <div className="oPort" id = {id[0]} style = {{backgroundColor: data.bg}}>
        <label htmlFor="text">{data.label}</label>
        {/* <input id="text" name="text" onChange={onChange} /> */}
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
export default OutPort;