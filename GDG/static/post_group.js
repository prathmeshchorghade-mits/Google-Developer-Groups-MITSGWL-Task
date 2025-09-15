document.addEventListener('DOMContentLoaded', () => {
    const groupForm = document.getElementById('group-form');
    const apiUrl = 'http://127.0.0.1:5000/api/groups';

    groupForm.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(groupForm);
        const groupData = {
            course_name: formData.get('course_name'),
            location: formData.get('location'),
            start_time: formData.get('start_time'),
            description: formData.get('description'),
            max_students: formData.get('max_students'),
            student_year: formData.get('student_year'),
            student_branch: formData.get('student_branch')
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(groupData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // On success, redirect to the view groups page
            window.location.href = '/groups';

        } catch (error) {
            console.error('Failed to create group:', error);
            alert('Failed to post group. Please try again.');
        }
    });
});