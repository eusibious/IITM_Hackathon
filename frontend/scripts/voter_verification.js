  document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector('.verify-form');
            const voterId = document.getElementById('voter-id');
            const challengeBlock = document.getElementById('challenge-block');
            const responseBlock = document.getElementById('response-block');
            const responseInput = document.getElementById('response');

            let revealed = false;

            form.addEventListener('submit', (event) => {
                if (revealed) {
                    return; // allow normal submission once fields are visible
                }

                event.preventDefault();

                if (!voterId.value.trim()) {
                    voterId.focus();
                    return;
                }

                challengeBlock.classList.remove('hidden');
                responseBlock.classList.remove('hidden');
                revealed = true;
                responseInput?.focus();
            });
        })();