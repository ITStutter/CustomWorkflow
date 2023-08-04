import ReactFlow, {internalsSymbol, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import '../text-updater-node.css';
import '../button.css';
import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import {nodeTalk} from '../App.js';


function Mode({ data, isConnectable }) {
  const dataContainer = data.elem
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 const ports = data.elem.ports.port

  return (
    <div onClick={data.onClick} id = {data.id} className="text-updater-node" style =  {{height: data.height,backgroundColor: dataContainer.background}}>
      <Handle type="target" style={{left:0}} position={Position.Top} id="a" isConnectable={isConnectable} />
      <div style = {{}}>{dataContainer.type}</div>
      
      <Handle type="source" style={{left:210}} position={Position.Top} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default Mode;
