# Get all files in the current directory, excluding this script
$files = Get-ChildItem -File | Where-Object { $_.Name -ne "rename_files.ps1" } | Sort-Object Name

# Initialize counter
$counter = 1

# Loop through each file and rename
foreach ($file in $files) {
    # Format the new name with zero-padded counter and original extension
    $newName = "NC-P-{0:D2}{1}" -f $counter, $file.Extension
    # Rename the file
    Rename-Item $file.FullName $newName
    # Increment counter
    $counter++
}

Write-Host "Renaming completed."
