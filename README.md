# MONDI: Secure File Sharing Aplication
MONDI is a secure file sharing application developed using Python's Django. This repository hosts the code for the API mainly and has a really simple React Frontend just to show functionality and how the frontend integrates & communicates with the backend

# API Routes & Functions
* "api/user/register/" - Register a user in the application
* "api/token/" - Generates JWT access tokens and refresh tokens for authenticated users
* "api/token/refresh/" - Generates a new access token for an authenticated user
* "api/files-upload/" - Lists all files uploaded by a specific user
* "api/files/<int:pk>/share/" - Shares Files with other users based on their usernames
* "files/shared/" - Lists all files shared with a user
* "api/logout" - Logs out an already authenticated user