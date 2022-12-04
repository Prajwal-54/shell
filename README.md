# shell
bash like shell using node.js , starts with default working directory set to user's home directory
## in this shell following commands work :

1) cd <directory_name> - Should work same as bash shell.
2)pwd - Prints current working directory.
3) ls <directory_name> - Should work same as bash shell. Support for flags is not required.
4) <path_to_binary> <args>- When path to a binary is provided, that binary should be spawned as a child process. The binary must receive all the arguments passed as space separated like arg1 arg2 ….
5) fg <pid> - Brings the background process with process id <pid> to foreground.
6) exit - Closes the shell.
