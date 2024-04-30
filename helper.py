import os

def replace_import_statement(root_directory, old_line, new_line):
    # Traverse the directory tree
    for directory, subdirectories, files in os.walk(root_directory):
        for filename in files:
            # Check if the file has a .md or .mdx extension
            if filename.endswith('.md') or filename.endswith('.mdx'):
                # Construct the full path to the file
                file_path = os.path.join(directory, filename)
                # Read the current content of the file and check if replacement is needed
                with open(file_path, 'r') as file:
                    content = file.readlines()
                
                # Flag to track if changes were made
                changed = False
                # Process each line in the content
                for i, line in enumerate(content):
                    if line.strip() == old_line:
                        content[i] = new_line + '\n'
                        changed = True

                # Write the modified content back to the file if changes were made
                if changed:
                    with open(file_path, 'w') as file:
                        file.writelines(content)

# Define the root directory to search in
root_directory = '/Users/ars/Codespace/LIT Protocol/docs/docs'

# Define the old and new import lines
old_import_line = 'import FeedbackComponent from "@site/src/components/FeedbackComponent";'
new_import_line = 'import FeedbackComponent from "@site/src/components/FeedbackComponent.md";'

# Call the function to start replacing text in files
replace_import_statement(root_directory, old_import_line, new_import_line)
