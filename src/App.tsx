import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  MiniMap,
} from 'reactflow';

// Importando os componentes
import { Sidebar, NodeType } from './components/Sidebar';
import {
  InitialNode,
  TransitionNode,
  FinalNode,
} from './components/CustomNodes';

// --- NOVO: Chaves para o LocalStorage ---
const NODES_STORAGE_KEY = 'react-flow-nodes';
const EDGES_STORAGE_KEY = 'react-flow-edges';

// Registra os tipos de nós customizados que criamos
const nodeTypes = {
  initial: InitialNode,
  transition: TransitionNode,
  final: FinalNode,
};

// Contador para IDs únicos (será resetado a cada load, 
// mas o ideal seria salvar isso também ou usar UUIDs)
let idCounter = 0;
const getUniqueNodeId = (type: string) => `${type}_${idCounter++}`;

/**
 * --- NOVO: Função helper para carregar dados do LocalStorage ---
 * Usa a inicialização "lazy" do useState para rodar isso apenas uma vez.
 */
const getInitialState = <T,>(key: string, defaultState: T[]): T[] => {
  const savedState = localStorage.getItem(key);
  if (savedState) {
    try {
      // Tenta carregar e parsear o estado salvo
      const parsedState = JSON.parse(savedState);
      // Se for um array (mesmo que vazio), retorna
      if (Array.isArray(parsedState)) {
        return parsedState;
      }
    } catch (e) {
      console.error("Falha ao carregar estado do localStorage", e);
    }
  }
  // Retorna o estado padrão se nada for encontrado ou houver erro
  return defaultState;
};


function App() {
  // --- NOVO: useState modificado para usar a função de carregar ---
  const [nodes, setNodes] = useState<Node[]>(() =>
    getInitialState(NODES_STORAGE_KEY, [])
  );
  const [edges, setEdges] = useState<Edge[]>(() =>
    getInitialState(EDGES_STORAGE_KEY, [])
  );

  // Manipulador para quando os nós mudam (arrastar, selecionar, remover)
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Manipulador para quando as arestas mudam (selecionar, remover)
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Manipulador para quando uma nova conexão (seta) é criada
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Função para ADICIONAR um novo nó (chamada pelo Sidebar)
  const handleAddNode = useCallback((type: NodeType) => {
    const id = getUniqueNodeId(type);
    let label = '';

    switch (type) {
      case 'initial':
        label = `Início ${idCounter}`;
        break;
      case 'transition':
        label = `Processo ${idCounter}`;
        break;
      case 'final':
        label = `Fim ${idCounter}`;
        break;
    }

    const newNode: Node = {
      id,
      type,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: label,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  // --- NOVO: Efeitos para salvar no LocalStorage ---

  // Salva os 'nodes' sempre que o estado 'nodes' mudar
  useEffect(() => {
    localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
  }, [nodes]);

  // Salva os 'edges' sempre que o estado 'edges' mudar
  useEffect(() => {
    localStorage.setItem(EDGES_STORAGE_KEY, JSON.stringify(edges));
  }, [edges]);


  return (
    <div className="app-container">
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag={true}
          zoomOnScroll={true}
          className="react-flow-canvas"
          // --- Mantendo o Snap (opcional) ---
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <Background variant="dots" gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <Sidebar
        onAddNode={handleAddNode}
        nodes={nodes}
        edges={edges}
      />

    </div>
  );
}

export default App;
