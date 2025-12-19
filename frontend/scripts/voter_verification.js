//import .env from '../../.env' ;  

// Provider, Wallet, Contract (Ethers v6)
// --------------------

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);


  
document.addEventListener('DOMContentLoaded', () => {

            // --------------------
            // DOM Elements
            // --------------------
            const form = document.querySelector('.verify-form');
            const voterId = document.getElementById('voter-id');
            const challengeBlock = document.getElementById('challenge-block');
            const responseBlock = document.getElementById('response-block');
            const responseInput = document.getElementById('response');
            const idEnterButton = document.getElementById('id-enter-button');


            let revealed = false;

            idEnterButton.onclick = (event) => {}


            // getNumberButton.onclick = async () => {
            // try {
            //     const number = await contract.getNumber();
            //     currentNumberSpan.innerText = number.toString();
            // } catch (err) {
            //     console.error("Error reading number:", err);
            //     alert("Error reading number. Check console.");
            // }
            // };

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