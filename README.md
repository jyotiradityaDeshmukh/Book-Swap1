# Book App – Kubernetes Local Deployment

This guide explains how to run the Book App locally in your Kubernetes (K8s) environment.

## 🚀 Getting Started

1. **Clone this repository**
   ```
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
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
   http://:30080
   ```
   - Replace `` with your host machine's IP address.

## 🖼️ Screenshot



## 📒 Notes

- Ensure `kubectl` is configured and connected to your local cluster.
- The manifest files (`client.yml`, `server.yml`) should be present in this repository.
- The app will be running in the `book-app` namespace.

Feel free to adjust titles, descriptions, or add badges and credits as needed!
```

Just copy and paste this into your `README.md` file.
