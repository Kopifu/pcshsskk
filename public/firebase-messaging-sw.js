// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBOrBpSjt73-X9t-WezjbVVxNqbIp2xWzs",
  authDomain: "pcshsnotify.firebaseapp.com",
  projectId: "pcshsnotify",
  storageBucket: "pcshsnotify.firebasestorage.app",
  messagingSenderId: "576676868881",
  appId: "1:576676868881:web:6f049b543872c36ccc52b0",
  measurementId: "G-WQR2D346FB"
});

const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Replace with your school logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});