document.addEventListener('DOMContentLoaded', () => {
            const groupList = document.getElementById('group-list');
            const apiUrl = 'http://127.0.0.1:5000/api/groups';

            /**
             * Fetches groups from the API and displays them on the page.
             */
            async function fetchAndDisplayGroups() {
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const groups = await response.json();

                    groupList.innerHTML = '';

                    if (groups.length === 0) {
                        groupList.innerHTML = '<p>No study groups posted yet.</p>';
                        return;
                    }

                    groups.forEach(group => {
                                const groupElement = document.createElement('div');
                                groupElement.className = 'group-item';
                                groupElement.innerHTML = `
                    <h3>${group.course_name}</h3>
                    <p><strong>📍 Location:</strong> ${group.location}</p>
                    <p><strong>⏰ Time:</strong> ${group.start_time}</p>
                    ${group.description ? `<p><strong>📝 Notes:</strong> ${group.description}</p>` : ''}
                    <div class="group-details">
                        ${group.student_branch || group.student_year ? `<span>🎓 Posted by: ${group.student_year || ''} ${group.student_branch || ''}</span>` : ''}
                        ${group.max_students ? `<span>👥 ${group.current_students} / ${group.max_students} students</span>` : ''}
                    </div>
                    <div class="group-footer">
                        <small>Posted on: ${new Date(group.created_at).toLocaleString()}</small>
                        <button 
                            class="join-button" 
                            data-group-id="${group.id}" 
                            ${group.max_students && group.current_students >= group.max_students ? 'disabled' : ''}
                        >
                            ${group.max_students && group.current_students >= group.max_students ? 'Full' : 'Join Group'}
                        </button>
                    </div>
                `;
                groupList.appendChild(groupElement);
            });
        } catch (error) {
            console.error('Failed to fetch groups:', error);
            groupList.innerHTML = '<p>Error loading study groups. Is the backend server running?</p>';
        }
    }

    /**
     * Handles clicks on the "Join Group" buttons using event delegation.
     */
    groupList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('join-button')) {
            const button = event.target;
            const groupId = button.dataset.groupId;

            button.disabled = true;
            button.textContent = 'Joining...';

            try {
                const response = await fetch(`${apiUrl}/${groupId}/join`, {
                    method: 'POST'
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to join group');
                }
                fetchAndDisplayGroups();
            } catch (error) {
                console.error('Failed to join group:', error);
                alert(error.message);
                button.disabled = false;
                button.textContent = 'Join Group';
            }
        }
    });

    // Initial fetch to load groups when the page is first opened
    fetchAndDisplayGroups();
});