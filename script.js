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
        e.dataTransfer.setData("text", e.target.id); // Save the id of the dragged piece
    }

    function dragEnd(e) {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.classList.remove('over'));
    }

    // Allow drop on board squares
    board.addEventListener("dragover", (e) => {
        e.preventDefault();  // Allow drop
    });

    board.addEventListener("drop", (e) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData("text"); // Get the id of the dragged piece
        const draggedPiece = document.getElementById(pieceId); // The piece being dragged
        const targetSquare = e.target.closest(".square"); // The square where it's dropped

        // If a square exists
        if (targetSquare) {
            const existingPiece = targetSquare.querySelector("img"); // Check if square has an existing piece

            // If the square contains a piece, it will be "captured" (removed)
            if (existingPiece) {
                existingPiece.remove();  // Capture the existing piece by removing it
            }

            // Add the dragged piece to the target square
            targetSquare.appendChild(draggedPiece);
        }
    });
});
