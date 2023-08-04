import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import "../index.css"

function InPort({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const id = useState(data.id)
  return (
    <div className="iPort" id = {id[0]} style = {{backgroundColor: data.bg}}>
        <label htmlFor="text">{data.label}</label>
        {/* <input id="text" name="text" onChange={onChange} /> */}
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
}

export default InPort;