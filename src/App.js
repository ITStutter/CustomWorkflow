import { useCallback, useState, useRef } from 'react';
import ReactFlow, {useNodesState,useEdgesState, Controls, ReactFlowProvider, useReactFlow, MarkerType, addEdge, applyEdgeChanges, applyNodeChanges,updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import TextUpdaterNode from './nodes/input.js';
import './text-updater-node.css';
import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';
import Romb from "./nodes/romb.js"
import './button.css';
import In from "./nodes/inPort.js"
import Out from "./nodes/outPort.js"
import More from "./nodes/node.js"


const nodeTypes = { more: More, romb: Romb, in: In, out: Out, inputText: TextUpdaterNode };
const connectionLineStyle = { stroke: 'white'};

let nodeId = 0;

export const nodeTalk = () => { 
    return (nodeId);
}

/*
const types = ["baseNode", "notABaseNode"];
const background = ["#555566", '#000099']
const inPorts = [5, 2];
const outPorts = [2, 3]
const bgIn = ["#009900","#000000"];
const bgOut = ["#990000","#000000"];
const shapes = ["default", "default"]
*/



function Flow() {
  //Здесь ВСЕ параметры, их нужно задавать 
  const specific = [
    {type: "none"},
    {type: "none"},
    {type: "none"},
    {type: "none"},
    {type: "input", dataType: "text"}
  ]
  // Типы данных (Тестовая ветка) 
  const dataType = [{id: "text", color: "#990000"}, {id: "int", color:"#009999"}, {id: "bool" ,color:"#009900"}, {id: "control",color: "#FFFFFF"}]

  const ports = [
    {port: [
      {type: "in", data: {dataType: dataType[0], label: "х"}},
      {type: "in", data: {dataType: dataType[1], label: "y"}},
      {type: "out", data: {dataType: dataType[3], label: "Больше"}},
      {type: "out", data: {dataType: dataType[3], label: "Не больше"}}
    ]},
    {port: [
      {type: "in",data: {dataType: dataType[1], label: "In_1"}},
      {type: "out",data: {dataType: dataType[1], label: "Out_1"}}
    ]},
    {port: [
      {type: "in",data: {dataType: dataType[1], label: "In_1"}},
      {type: "out",data: {dataType: dataType[1], label: "Out_1"}},
      {type: "out",data: {dataType: dataType[1], label: "Out_2"}},
      
    ]},
    {port: [
      {type: "in",data: {dataType: dataType[0],label: "In_1"}},
      {type: "out",data: {dataType: dataType[1],label: "Out_1"}},
      
    ]},
    {}
  ]
  const elem = [
      {type: "x>y",spec: specific[0], ports: ports[0], background: "#005566"},
      {type: "Узел передачи",spec: specific[1],ports: ports[1], background: "#000099"},
      {type: "anotherNode",spec: specific[2],ports: ports[2], background: "#999999"},
      {type: "Текст в int",spec: specific[3],ports: ports[3], background: "#999999"},
      {type: "inputNode",spec: specific[4],ports: ports[4], background: dataType.text}
    ]
    // shape может быть: default - базовая форма, прямоугольник, rhomb - разветвитель
  const rfStyle = {
    backgroundColor: '#555566',
  };

  const edgeOptions = {
    animated: false,
    style:{stroke:"wnite"},
    type: "smoothstep",
    markerEnd: {
      width: 20,
      height: 20,
      type: MarkerType.ArrowClosed,
      color: "black"
    },
  };

  //Обработка связей
  const recolor = ((connection) => {
    const target = connection.target
    const source = connection.source
    if(connection.target.includes("_")) {
      connection.style = {stroke: document.getElementById(connection.source).style.backgroundColor};
      }
    connection.id = connection.source+''+connection.target
    //Концепция плохая! Обращение к элементу
    return (reactFlowInstance.getNode(target+"").data.dataType.id===reactFlowInstance.getNode(source+"").data.dataType.id)
  })
  
  const reactFlowInstance = useReactFlow();
  const isValidConnection = (connection) => recolor(connection)
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useNodesState(defaultNodes);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);


    // Главный узел 
    const newNode = useCallback((index) => {
      console.log(nodeId)
      const id = `${++nodeId}`;
      //порты
      if(elem[index].spec.type ==="none"){
        let portId = 0;
        let yi = 0;
        let yo = 0;
        
        for(let item of elem[index].ports.port){
          if(item.type==="out") item.position = {
            x: 115,
            y: yo+=50,
          };
          else item.position = {
            x: 0,
            y: yi+=50,
          };
          item.data.bg = item.data.dataType.color;
          item.draggable = false;
          item.id=id+"_"+portId;
          item.parentNode = id+'';
          item.data.id = item.id;
          item.extent="parent"
          portId=portId+1;        
        }
        const tPorts =  elem[index].ports.port
        let height;
        if(yi>yo) height=yi
        else height = yo;
        //родительский нод
        const newNode = {
          id,
          type: 'more',
          position: {
            x: Math.random() * 500,
            y: Math.random() * 500,
          },
          style:{height: height+45},
          data: {
            dataType: {id:"control"},
            id: id,
            height: height+35,
            elem: elem[index],
          },
        };
        reactFlowInstance.addNodes(newNode);
        reactFlowInstance.addNodes(tPorts);
      }
      // Ввод
      if(elem[index].spec.type ==="input"){
        if(elem[index].spec.dataType === "text"){
          const newNode = {
            id: id+"IN",
            type: 'inputText',
            position: {
              x: Math.random() * 500,
              y: Math.random() * 500,
            },
            style:{height: 50},
            data: {
              id: id+"IN",
              height: 50,
              elem: elem[index],
            },
          };
          reactFlowInstance.addNodes(newNode);
        }
      }
    }, []);

    const deleteNode = ((e)=>{
      e.preventDefault();
      if(e.target.id.length!=0 && !e.target.id.includes("_")){
        reactFlowInstance.setNodes((nds) => nds.filter((node) => node.parentNode !== e.target.id))
        reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== e.target.id))
      }
      else if(!e.target.parentElement.id.includes("_")){
        reactFlowInstance.setNodes((nds) => nds.filter((node) => node.parentNode !== e.target.parentElement.id))
        reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== e.target.parentElement.id))
      }
    })
    
    // Ветвление, в форме ромба
    const ifNode = useCallback(() => {
      const id = `${++nodeId}`;
      const newNode = {
        id,
        type: 'romb',
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: {
          label: `Node ${id}`,
        },
      };
      reactFlowInstance.addNodes(newNode);
    }, []);
    const showAll = useCallback(()=>{
      console.log(reactFlowInstance.getNodes()) 
      console.log(reactFlowInstance.getEdges()) 
    })
    return (
      <div style={{ height: 800 }}>
        <ReactFlow
          defaultNodes={defaultNodes}
          edges={edges}
          onContextMenu={deleteNode}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          isValidConnection={isValidConnection}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onConnect={onConnect}
          defaultEdgeOptions={edgeOptions}
          fitView
          style={rfStyle}
          connectionLineStyle={connectionLineStyle}
          nodeTypes={nodeTypes}
        >
          <Controls/>
          </ReactFlow>
        {elem.map((item, index) =>(
          <button key = {index} onClick = {newNode.bind(this, index)}>{item.type}</button>
        ))}
        <button onClick = {showAll}>Показать</button>
      </div>
    );
  }

  export default function () {
    return (
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    );
  }
