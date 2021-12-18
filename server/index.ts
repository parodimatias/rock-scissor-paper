import { firestore, rtdb } from "./db";
const cors = require("cors");
const express = require("express");
const { nanoid } = require("nanoid");

const port = process.env.PORT || 3000;

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/rooms", function (req, res) {
  const { userId } = req.body; //se toma el userId del body del post
  userCollection
    .doc(userId) //referencia del documento con el userId
    .get() //se toma una snap de ese documento
    .then((docSnap) => {
      if (docSnap.exists) {
        //si hay un documento con ese userId se permite crear un room
        const roomRtRef = rtdb.ref("rooms/" + nanoid()); //se crea una referencia
        roomRtRef.set({ playerOne: { name: docSnap.data().name } }, (error) => {
          //se guarda el objeto en esa referencia
          if (error) {
            console.log("Data could not be saved." + error);
            res.status(400).send("error");
          } else {
            const roomLongId = roomRtRef.key; //extrae el id
            const roomId = Math.floor(
              Math.random() * (99999 - 10000) + 10000
            ).toString();
            roomsCollection
              .doc(roomId)
              .set({ rtId: roomLongId, playerOneNameId: userId })
              .then(() => {
                console.log("Room created by Player 1.");
                res.json({ rtId: roomLongId, roomId: roomId });
              })
              .catch((err) => {
                console.log(`Failed to create document: ${err}`);
              });
          }
        });
      }
    });
});
//ingresa con nombre
app.post("/signin", (req, res) => {
  const { name } = req.body;
  userCollection
    .where("name", "==", name)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        const userRef = userCollection.doc();
        userRef.set({ name }).then((res) => {});
        res.json({ userId: userRef.id });
      } else {
        res.json({ userId: querySnapshot.docs[0].id });
      }
    });
});
app.post("/rooms/:roomId", (req, res) => {
  const { userId } = req.body;
  const { roomId } = req.params;
  userCollection
    .doc(userId)
    .get()
    .then((snapUsers) => {
      if (snapUsers.exists) {
        //usuario existente, paso a devolver el id de la rtdb
        roomsCollection
          .doc(roomId)
          .get()
          .then((snapRooms) => {
            if (snapRooms.data().playerOneNameId == userId) {
              console.log("Player 1 re-join");
              res.json(snapRooms.data());
            } else if (typeof snapRooms.data().playerTwoNameId != "undefined") {
              if (snapRooms.data().playerTwoNameId == userId) {
                console.log("Player 2 re-join");
                console.log(snapRooms.data());
                res.json(snapRooms.data());
              } else {
                console.log("room full");
                res.status(401).send({});
              }
              console.log("cccc");
            } else {
              // object does not exist
              console.log("bbbb");
              const rtId = snapRooms.data().rtId;
              const roomRtRef = rtdb.ref("rooms/" + rtId);
              roomsCollection
                .doc(roomId)
                .update({ playerTwoNameId: userId })
                .then((res) => {
                  console.log("Player 2 Sign up");
                  roomRtRef
                    .child("playerTwo")
                    .update({ name: snapUsers.data().name });
                  console.log(snapRooms.data());
                  res.json(snapRooms.data());
                });
            }
          });
      } else {
        res.status(404).send("user not found");
      }
    });
});

app.post("/play", (req, res) => {
  const { userId } = req.body;
  const { rtId } = req.body;
  userCollection
    .doc(userId)
    .get()
    .then((snapUsers) => {
      if (snapUsers.exists) {
        const userName = snapUsers.data().name;
        const roomRtRef = rtdb.ref("rooms/" + rtId);
        roomRtRef.once(
          "value",
          (snapshot) => {
            if (snapshot.val().playerOne.name == userName) {
              roomRtRef.child("playerOne").update({ play: 1 });
              res.json("Player One ready");
            }
            if (snapshot.val().playerTwo.name == userName) {
              roomRtRef.child("playerTwo").update({ play: 1 });
              res.json("Player Two ready");
            }
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );
      }
    });
});
app.post("/unplay", (req, res) => {
  const { userId } = req.body;
  const { rtId } = req.body;
  userCollection
    .doc(userId)
    .get()
    .then((snapUsers) => {
      if (snapUsers.exists) {
        const userName = snapUsers.data().name;
        const roomRtRef = rtdb.ref("rooms/" + rtId);
        roomRtRef.once(
          "value",
          (snapshot) => {
            if (snapshot.val().playerOne.name == userName) {
              roomRtRef.child("playerOne").update({ play: 0 });
              res.json("Player One unready");
            }
            if (snapshot.val().playerTwo.name == userName) {
              roomRtRef.child("playerTwo").update({ play: 0 });
              res.json("Player Two unready");
            }
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );
      }
    });
});
app.post("/play-move", (req, res) => {
  const { userId } = req.body;
  const { rtId } = req.body;
  const { move } = req.body;
  userCollection
    .doc(userId)
    .get()
    .then((snapUsers) => {
      if (snapUsers.exists) {
        const userName = snapUsers.data().name;
        const roomRtRef = rtdb.ref("rooms/" + rtId);
        roomRtRef.once(
          "value",
          (snapshot) => {
            if (snapshot.val().playerOne.name == userName) {
              roomRtRef.child("playerOne").child("moves").push(move);
              res.json("Player One moved");
            }
            if (snapshot.val().playerTwo.name == userName) {
              roomRtRef.child("playerTwo").child("moves").push(move);
              res.json("Player Two moved");
            }
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );
      }
    });
});
