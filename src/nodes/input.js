import ReactFlow, {useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import '../text-updater-node.css';
import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';


function TextUpdaterNode({ data, isConnectable }) {
  const dataContainer = data.elem
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [inputs, setInputs] = useState([]);


  const addInput = () =>{
    const newInput = <input id= "" name="text" onChange={onChange} className= "nodrag" />;
    setInputs([...inputs, newInput]);

  }
  return (
    <div  id = {data.id} className="text-updater-node" style =  {{height: data.height,backgroundColor: dataContainer.background}}>
      <div>Text:</div>
      <input name="text" onChange={onChange}/>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
