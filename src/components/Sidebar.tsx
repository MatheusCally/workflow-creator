import React from 'react';
import { Node, Edge } from 'reactflow';

// Tipos de nós que podemos criar
export type NodeType = 'initial' | 'transition' | 'final';

interface SidebarProps {
  // Função para adicionar um nó, vinda do App.tsx
  onAddNode: (type: NodeType) => void;

  // Dados atuais para visualização
  nodes: Node[];
  edges: Edge[];
}

export function Sidebar({ onAddNode, nodes, edges }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div>
        <h3>Adicionar Estados</h3>
        <button onClick={() => onAddNode('initial')}>
          + Adicionar Estado Inicial
        </button>
        <button onClick={() => onAddNode('transition')}>
          + Adicionar Transição
        </button>
        <button onClick={() => onAddNode('final')}>
          + Adicionar Estado Final
        </button>
      </div>

      <div>
        <h3>Dados do Fluxo (Estado)</h3>
        <p>Estes dados estão prontos para salvar no DB:</p>

        <strong>Nós (Nodes):</strong>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>

        <strong>Arestas (Edges):</strong>
        <pre>{JSON.stringify(edges, null, 2)}</pre>
      </div>
    </aside>
  );
}
