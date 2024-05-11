// Function to fetch exam data from CSV
async function fetchExamData() {
    try {
        const response = await fetch('QuickPDF/exams.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header row
        const exams = rows.map(row => {
            const columns = row.split(',');
            return {
                name: columns[0].trim(),
                time: new Date(columns[1].trim()),
            };
        });
        return exams;
    } catch (error) {
        console.error('Error fetching exam data:', error);
        return [];
    }
}

// Function to convert current exam data into CSV format
function convertToCSV(exams) {
    let csv = 'Name,Time\n'; // Header row
    exams.forEach(exam => {
        const formattedTime = `${exam.time.getFullYear()}-${(exam.time.getMonth() + 1).toString().padStart(2, '0')}-${exam.time.getDate().toString().padStart(2, '0')} ${exam.time.getHours().toString().padStart(2, '0')}:${exam.time.getMinutes().toString().padStart(2, '0')}`;
        csv += `${exam.name},${formattedTime}\n`;
    });
    return csv;
}

// Example current exam data
const currentExams = [
    { name: "MM CT1", time: new Date("2024-05-12T13:00:00") },
    { name: "MID start", time: new Date("2024-06-08T10:30:00") },
    { name: "DSML Lab perf", time: new Date("2024-05-13T08:30:00") },
    { name: "MLD CT1", time: new Date("2024-05-15T10:00:00") },
    { name: "BIO CT1", time: new Date("2024-05-19T08:30:00") }
];

// Convert current exam data to CSV format
const csvData = convertToCSV(currentExams);
console.log(csvData); // Output CSV data
