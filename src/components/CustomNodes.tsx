import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Interface comum para os dados do nó
interface NodeData {
  label: string;
}

/**
 * Nó Inicial:
 * - Apenas uma saída (source) à direita.
 * - Não pode receber conexões (target).
 */
export function InitialNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="custom-node initial-node">
      <strong>Estado Inicial</strong>
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

/**
 * Nó de Transição:
 * - Uma entrada (target) à esquerda.
 * - Uma saída (source) à direita.
 */
export function TransitionNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="custom-node transition-node">
      <strong>Estado de Transição</strong>
      {data.label}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

/**
 * Nó Final:
 * - Apenas uma entrada (target) à esquerda.
 * - Não pode criar conexões de saída (source).
 */
export function FinalNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="custom-node final-node">
      <strong>Estado Final</strong>
      {data.label}
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
