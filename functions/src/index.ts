/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {initializeApp} from "firebase-admin/app";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import { getFirestore } from "firebase-admin/firestore";

const firebaseApp = initializeApp();

  exports.syncTreeFromActiveServers = onDocumentUpdated("servers/{docId}",
    async (event:any) => {
    const afterData = event.data.after.data();

    const docRef = await getFirestore(firebaseApp).collection("servers").doc('serversTree');
    await docRef.update({
            [`${(Object.entries(afterData.servers)[0][1] as any).path}`]: Object.entries(afterData.servers)[0][1]
          });

    for (const [key, value] of Object.entries(afterData.servers)) {
        await docRef.update({
            [`${(value as any).path}`]: value
          });
    }
  });