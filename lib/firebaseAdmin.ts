// lib/firebaseAdmin.ts
import { initializeApp, getApps, cert, ServiceAccount, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
// Initialize the app only if it hasn't been initialized yet

// Define the service account object
const serviceAccount: ServiceAccount = {
  projectId: "pcshsnotify",
  clientEmail: "firebase-adminsdk-fbsvc@pcshsnotify.iam.gserviceaccount.com",
  // Fixes the potential newline issues in the private key string
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkDxFZEWGjT6Gs\nj740QqJ5CQ6yItJWoetXK0G9XMIQ1O0FM7BOpIPJnH9kABR+umSkoAmcUvdMzfYW\nBOm5/s6fCVcg5NeDC+/zuyKln1VtYhj2bhJTp2U3e4QC7+3L9c53V29iI2Tj4Tjy\n6+iB+5ESUBt+RKog8dDJgzW0ltZtIkyn49Yc1bebEOYEZs4pzPePYDP9RztVi0pt\nGr8rf47kDhQKK8kzPz4m3R2mS0b9SiQVGZrnVNGy86vJyRa16vYMMEceWY2evNc6\nvCNlhxFhxEJN+/Vba8LOAj9U3g8SKOGYM7EAy0srg0aXY9Orsaz4C29zMZPE3Jl2\n3vnsT5AnAgMBAAECggEAcG8VSGoPTupVdLOxPCaV30Id4qjUNi3BzsnesTLn4lB3\nQhdHlp348w6ap3x6njfaombcFhu5HD52Uki9yhrbVwDN2cO4lDzwYaMi47B392Nj\nlyqREnj2p7HXVXNgMyvOTHvox+NXPBmvb+PqTxrtXK/tvgSwM2nEW3S6p3ut30MZ\ncRpQuqQ60lpORKwfxRZ5av+EvXkn13gYff2JqvF08rN/5uViSj+B4Apfkc7IThlW\neHzf43Bu6bE/c5IJHLTf1RhfYHSZc6TSCgehjuqIfsFwC31T6n4k9dblkOD/8OFC\n28lXGkluZrfHvzIyZe9B6XO87fX/YOBCU7QeyiDIsQKBgQD0AsgVOw/Eo/S/JkIS\npamvboxBPsu4LWt11i7CD1+IapKNi6009GHQ8OkX3rj53MrzaCpmxh7yR4vQdQ/F\n/oAGf1gYO1Zlc1hom/UxofNeq/VChGW3FllA3GdJgcyNJOdumxFaJpsFKWqu2ZQg\nk2gJ2prFK5t4eN854TYYLK/76wKBgQDvQ6N63VQgxdmjop74Aim6LfkcPPhPEHtc\nK+DqK2RnW9SHwjpdzMmmMsQfKgns7okjIM8gmrgAVOsSjKqCX5zI1mLqWBoqr+oR\na5h4S9sjgtjJNG3Kt/mFotlymfwfxkuj+lPmaJjCfzv9d9l65vXTiUc5O7GzWlFd\ntwtxbTmZtQKBgCag9hneUr23kvxbyyP2k+lQ3+VIUqnijtuFv7s7Ac2vyWmdDhuP\nAJk6OjxsJu5vVLW57NR+UtHaH7ktfwTCKHRe3oxfgGrpGrrczbFAyS1YnagdG5kj\ncZfCDJvnb4F8sSKia9nQuMPVba0mhrutek/tColiQOeOgxA/pfenw2hnAoGBAJvF\nEmrMK5hGlwHkvtBCQD5Y7eTHgPWgil+gpYZvB6gO7hgQiIVG7UWJqYuMh/e7+IZp\nNtBISmDU6FIkSGIms2FByhY9k5OVAbOjtBklcZ718gNUYeJn0kiBlEX7IFzjcZ1p\nPTQ1hrahtUG4xFsygHre1gLZ7UASHgUARa/r52M9AoGBAOycQBF65dwG6tLd4KG+\nwXVNhUnVjkK5OiEQrvT7sIn9ovHAchP9/aTPKjvGFNlm1CRc+Az0LT5lmm0FLqlj\nhV8B+pWpagH1QEvfHz9wHbIFY4AmlL9wWvvuY42ms8zAu9Bxi7v1GjmQYaJ6sqL3\nVAGFd1qiMTw9Lsjq0NKohiRV\n-----END PRIVATE KEY-----\n",
};
const app = getApps().length === 0 
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp();


// Export the specific services you need
export const db = getFirestore(app);
export const messaging = getMessaging(app);