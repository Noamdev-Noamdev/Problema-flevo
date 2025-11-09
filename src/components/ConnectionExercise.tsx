import { useState, useRef, useEffect } from "react";
import MathRenderer from "./MathRenderer";
import { Button } from "./ui/button";
import { X, RotateCcw } from "lucide-react";
import type { VerbindingsItem } from "@/lib/exerciseLoader";

interface ConnectionExerciseProps {
  questionNumber: number;
  linksItems: string[];
  rechtsItems: string[];
  correcteVerbindingen: VerbindingsItem[];
  showSolution: boolean;
  onReset?: () => void;
}

interface Position {
  x: number;
  y: number;
}

const ConnectionExercise = ({
  questionNumber,
  linksItems,
  rechtsItems,
  correcteVerbindingen,
  showSolution,
  onReset
}: ConnectionExerciseProps) => {
  const [connections, setConnections] = useState<VerbindingsItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [dotPositions, setDotPositions] = useState<{
    left: { [key: string]: Position };
    right: { [key: string]: Position };
  }>({ left: {}, right: {} });

  const containerRef = useRef<HTMLDivElement>(null);
  const leftDotsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const rightDotsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update dot positions
  const updatePositions = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: typeof dotPositions = { left: {}, right: {} };

    Object.entries(leftDotsRef.current).forEach(([item, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        newPositions.left[item] = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }
    });

    Object.entries(rightDotsRef.current).forEach(([item, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        newPositions.right[item] = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }
    });

    setDotPositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [linksItems, rechtsItems, connections]);

  // Handle left dot click
  const handleLeftClick = (item: string) => {
    if (showSolution) return;
    setSelectedLeft(selectedLeft === item ? null : item);
  };

  // Handle right dot click
  const handleRightClick = (item: string) => {
    if (showSolution || !selectedLeft) return;

    // Check if this right item is already connected
    const existingConnection = connections.find(c => c.rechts === item);
    if (existingConnection) return;

    // Check if the selected left item is already connected
    const leftConnection = connections.find(c => c.links === selectedLeft);
    if (leftConnection) {
      // Replace the connection
      setConnections(prev =>
        prev.map(c => (c.links === selectedLeft ? { links: selectedLeft, rechts: item } : c))
      );
    } else {
      // Add new connection
      setConnections(prev => [...prev, { links: selectedLeft, rechts: item }]);
    }

    setSelectedLeft(null);
  };

  // Remove connection
  const removeConnection = (rightItem: string) => {
    if (showSolution) return;
    setConnections(prev => prev.filter(c => c.rechts !== rightItem));
  };

  // Reset all connections
  const handleReset = () => {
    setConnections([]);
    setSelectedLeft(null);
    onReset?.();
  };

  // Check if connection is correct
  const isCorrectConnection = (connection: VerbindingsItem): boolean => {
    return correcteVerbindingen.some(
      c => c.links === connection.links && c.rechts === connection.rechts
    );
  };

  // Get connection color
  const getConnectionColor = (connection: VerbindingsItem): string => {
    if (!showSolution) return "hsl(var(--primary))";
    return isCorrectConnection(connection) ? "#22c55e" : "#ef4444";
  };

  // Check if left item is connected
  const getLeftConnection = (leftItem: string) => {
    return connections.find(c => c.links === leftItem);
  };

  // Check if right item is connected
  const getRightConnection = (rightItem: string) => {
    return connections.find(c => c.rechts === rightItem);
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      {!showSolution && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between">
          <p className="text-sm font-medium">
            {selectedLeft
              ? "✓ Klik op een bolletje rechts om de verbinding te maken"
              : "① Klik op een bolletje links om te beginnen"}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 h-8"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      )}

      <div ref={containerRef} className="relative">
        {/* SVG for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {connections.map((connection, index) => {
            const leftPos = dotPositions.left[connection.links];
            const rightPos = dotPositions.right[connection.rechts];
            if (!leftPos || !rightPos) return null;

            return (
              <line
                key={index}
                x1={leftPos.x}
                y1={leftPos.y}
                x2={rightPos.x}
                y2={rightPos.y}
                stroke={getConnectionColor(connection)}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="grid md:grid-cols-2 gap-8 relative" style={{ zIndex: 2 }}>
          {/* Left column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Linker items
            </h4>
            {linksItems.map((item, index) => {
              const connection = getLeftConnection(item);
              const isSelected = selectedLeft === item;

              return (
                <div key={index} className="relative flex items-center gap-3">
                  <div
                    onClick={() => handleLeftClick(item)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      connection && showSolution
                        ? isCorrectConnection(connection)
                          ? "bg-green-500/10 border-green-500"
                          : "bg-red-500/10 border-red-500"
                        : isSelected
                        ? "bg-primary/20 border-primary"
                        : connection
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border"
                    } ${showSolution ? "" : "cursor-pointer hover:border-primary/50"}`}
                  >
                    <MathRenderer content={item} />
                  </div>
                  
                  {/* Right dot for left item */}
                  <div
                    ref={el => (leftDotsRef.current[item] = el)}
                    onClick={() => handleLeftClick(item)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary border-primary scale-125"
                        : connection
                        ? "bg-primary border-primary"
                        : "bg-background border-border hover:border-primary hover:scale-110"
                    } ${showSolution ? "cursor-default" : "cursor-pointer"}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Rechter items
            </h4>
            {rechtsItems.map((item, index) => {
              const connection = getRightConnection(item);

              return (
                <div key={index} className="relative flex items-center gap-3">
                  {/* Left dot for right item */}
                  <div
                    ref={el => (rightDotsRef.current[item] = el)}
                    onClick={() => handleRightClick(item)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all ${
                      selectedLeft && !connection
                        ? "bg-background border-primary hover:bg-primary cursor-pointer hover:scale-110"
                        : connection
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    } ${
                      showSolution
                        ? "cursor-default"
                        : !selectedLeft || connection
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                  />

                  <div
                    onClick={() => handleRightClick(item)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      connection && showSolution
                        ? isCorrectConnection(connection)
                          ? "bg-green-500/10 border-green-500"
                          : "bg-red-500/10 border-red-500"
                        : connection
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border"
                    } ${
                      showSolution
                        ? ""
                        : selectedLeft && !connection
                        ? "cursor-pointer hover:border-primary/50"
                        : ""
                    }`}
                  >
                    <MathRenderer content={item} />
                  </div>

                  {/* Remove button */}
                  {connection && !showSolution && (
                    <button
                      onClick={() => removeConnection(item)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all flex items-center justify-center"
                      title="Verwijder verbinding"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Connection summary when solution is shown */}
      {showSolution && (
        <div className="bg-muted/30 rounded-lg p-4 border border-muted">
          <h4 className="font-semibold text-sm mb-3">Jouw resultaat:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>
                {connections.filter(c => isCorrectConnection(c)).length} correct
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span>
                {connections.filter(c => !isCorrectConnection(c)).length} fout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionExercise;
