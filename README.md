# Explainable Music

## Getting Started 
Follow these instructions to run the app locally

**NOTE: All scripts should be executed from the project’s root directory.**

### Install Dependencies

Install server dependencies

'''
npm i
'''

Install client dependencies

'''
npm run client-install
'''

### Run Build

The following command runs both the server and React app in development mode.

'''
npm run dev
'''

Open http://localhost:3000 to view it in the browser.

## Project Structure

All files outside of the 'client' folder are used by the express server.

- 'server.js' is the entry script for the server.
- 'app.js' creates and configures the express app.
- The directory 'routes\api' contains the actual server functions and logic.
- The 'models' directory contains our database schemas.

Everything within the 'client' folder is related to the React client.

- The 'components' directory contains the '.js' component files.
- The 'public\uploads' directory contains '.mid' and '.pdf' files that users uploaded

