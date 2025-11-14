# Quick Start Guide

## To Run the Application:

1. **Open Terminal** in the project directory (`/Users/deannaglaze/Documents/RIQ`)

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Look for output like this:**
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## Important Notes:

- ⚠️ **Don't open `index.html` directly** in your browser - it won't work!
- ✅ You **must** use the development server URL: `http://localhost:5173`
- The server must be running for the app to work
- Press `Ctrl+C` in the terminal to stop the server

## If You Get "Site Can't Be Reached":

1. Make sure the server is running (you should see the Vite output in your terminal)
2. Check that you're using `http://localhost:5173` (not `file://`)
3. Try `http://127.0.0.1:5173` as an alternative
4. Make sure no firewall is blocking port 5173
5. Check if another application is using port 5173

## Troubleshooting:

If port 5173 is already in use, Vite will automatically use the next available port (5174, 5175, etc.). Check your terminal output for the actual URL.

