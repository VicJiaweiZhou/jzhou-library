const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
const cors = require("cors")({ origin: true });

initializeApp();
const db = getFirestore();

// HTTP function: count total number of books
exports.getBookCount = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("books").get();
      const total = snapshot.size;
      res.status(200).send({ total: total });
    } catch (error) {
      console.error("Error counting books:", error);
      res.status(500).send("Error counting books");
    }
  });
});

// Firestore trigger: capitalize book title on creation
exports.capitalizeBookTitle = onDocumentCreated("books/{bookId}", async (event) => {
  const snap = event.data;
  if (!snap) return;
  const data = snap.data();

  if (data && data.name) {
    const capitalizedName = data.name.toUpperCase();
    await db.collection("books").doc(event.params.bookId).update({
        name: capitalizedName,
    });
    console.log(`Title capitalized for book: ${event.params.bookId}`);
  }
});
