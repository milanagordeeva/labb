function loadData() {
    fetch('program_workout.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "text/xml");

            // Сохраняем оригинальные данные
            const exercises = Array.from(xml.getElementsByTagName('exercise')).map(exercise => ({
                name: exercise.getElementsByTagName('name')[0].textContent,
                sets: parseInt(exercise.getElementsByTagName('sets')[0].textContent),
                reps: parseInt(exercise.getElementsByTagName('reps')[0].textContent),
                weights: parseInt(exercise.getElementsByTagName('weights')[0].textContent)
            }));

            renderTable(exercises);

            // Фильтрация и сортировка
            document.getElementById('filterName').addEventListener('input', (event) => {
                const filterText = event.target.value.toLowerCase();
                const filteredData = exercises.filter(exercise =>
                    exercise.name.toLowerCase().includes(filterText)
                );
                renderTable(filteredData);
            });

            document.getElementById('sortBy').addEventListener('change', (event) => {
                const sortBy = event.target.value;
                const sortedData = [...exercises].sort((a, b) => {
                    if (sortBy === 'name') {
                        return a.name.localeCompare(b.name);
                    } else if (sortBy === 'sets' || sortBy === 'weights') {
                        return a[sortBy] - b[sortBy];
                    }
                    return 0;
                });
                renderTable(sortedData);
            });
        });
}

function renderTable(data) {
    const table = document.getElementById('workoutTable');
    const totalResult = document.getElementById('totalResult');

    let rows = '';
    let totalWeight = 0;

    data.forEach(exercise => {
        const result = exercise.sets * exercise.reps * exercise.weights;
        totalWeight += result;

        rows += `
            <tr>
                <td>${exercise.name}</td>
                <td>${exercise.sets}</td>
                <td>${exercise.reps}</td>
                <td>${exercise.weights}</td>
            </tr>`;
    });

    table.innerHTML = rows;
    totalResult.textContent = totalWeight;
}

document.addEventListener('DOMContentLoaded', loadData);
