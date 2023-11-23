import csv

# Open input and output files
with open('input.txt', 'r') as f_in, open('questions.csv', 'w', newline='') as f_out:
    writer = csv.writer(f_out)

    # Loop through each line in the input file
    for line in f_in:
        # Check if the line starts with "questions.push(new createQuestion("
        if line.startswith('questions.push(new createQuestion('):
            # Keep appending to the current line until we find the line break indicator ";"
            while not line.endswith(');\n'):
                line += next(f_in)

            # Remove unnecessary parts of the line and split into separate values
            line = line.replace('",', ' ,')
            line = line.replace('\n', '').replace('  ',' ')
            line = line.replace('questions.push(new createQuestion("', '').replace(', questions', '')
            line = line.replace('new createRating((', '').replace('), ', ', ').replace('new createRating(', '')
            line = line.replace(');','')
            line = line.replace('), new createRating(', ', ').replace('))', '')
            #if there is more more than 4 commas loop thoruogh removing them from the beginning till there is only 4
            while line.count(',') > 4:
                line = line.replace(',', '`', 1)
            line = line.strip().split(',')
            # Write the values to the output file with a extra comma at the end
            writer.writerow(line + [''])