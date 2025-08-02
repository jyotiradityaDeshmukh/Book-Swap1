# Book App – Kubernetes Local Deployment

This guide explains how to run the Book App locally in your Kubernetes (K8s) environment.

## 🚀 Getting Started

1. **Clone this repository**
   ```
   git clone https://github.com/jyotiradityaDeshmukh/Book-Swap1.git
   cd Book-Swap1
   ```

2. **Create a namespace for your app**
   ```
   kubectl create ns book-app
   ```

3. **Deploy the client and server components**

   ```
   kubectl apply -f client.yml
   kubectl apply -f server.yml
   ```

4. **Access your application**

   Open your browser and navigate to:
   ```
   http://<host-ip>:30080
   ```
   - Replace `<host-ip>` with your host machine's IP address.

## 🖼️ Screenshot
<img width="1913" height="923" alt="Screenshot from 2025-07-30 11-15-39" src="https://github.com/user-attachments/assets/2c2670e0-eb96-4b12-816b-a94ae1d2126d" />



## 📒 Notes

- Ensure `kubectl` is configured and connected to your local cluster.
- The manifest files (`client.yml`, `server.yml`) should be present in this repository.
- The app will be running in the `book-app` namespace.
