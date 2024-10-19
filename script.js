document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("chessboard");
    const initialPosition = {
        0: ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
        1: ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
        6: ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
        7: ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    };

    // Generate board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            square.id = `${row}-${col}`;
            board.appendChild(square);

            // Add initial pieces
            if (initialPosition[row]) {
                const pieceColor = row < 2 ? "w" : "b"; // White or Black
                const piece = initialPosition[row][col];
                if (piece) {
                    const img = document.createElement("img");
                    img.src = `pieces/${pieceColor}_${piece}.png`;
                    img.draggable = true;
                    img.id = `${row}-${col}-${piece}`;
                    img.addEventListener("dragstart", dragStart);
                    img.addEventListener("dragend", dragEnd);
                    square.appendChild(img);
                }
            }
        }
    }

    // Dragging functionality
    function dragStart(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    function dragEnd(e) {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.classList.remove('over'));
    }

    // Allow drop on board squares
    board.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    board.addEventListener("drop", (e) => {
        const pieceId = e.dataTransfer.getData("text");
        const draggedPiece = document.getElementById(pieceId);
        const targetSquare = e.target.closest(".square");

        if (targetSquare && !targetSquare.querySelector("img")) {
            targetSquare.appendChild(draggedPiece);
        }
    });
});

