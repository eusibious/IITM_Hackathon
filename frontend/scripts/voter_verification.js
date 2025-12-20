document.addEventListener("DOMContentLoaded", function() {
    // Event listeners
    document.getElementById("id-enter-button").addEventListener("click", displayChallenge);
    document.getElementById("verify-button").addEventListener("click", verifyResponse);
});

let signer;
let userAddress;

const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);

const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONFIG.ABI, provider);

async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
    }

    const provider1 = new ethers.BrowserProvider(window.ethereum);

    // Request wallet connection
    await provider1.send("eth_requestAccounts", []);

    signer = await provider1.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("wallet-address").innerText =
        "Connected: " + userAddress;

    alert("Wallet connected:", userAddress);
}


async function displayChallenge(event) {
    event.preventDefault();
    
    const voterId = document.getElementById("voter-id").value.trim();

    if (voterId === "") {
        alert("Please enter your Voter ID");
        return;
    }

    // Generate challenge 
    const challengeText = await contract.getChallenge();
    //const challengeText = "sample_challenge"; // Placeholder for testing
    
    // Display challenge
    const challengeInput = document.getElementById("challenge-text");
    challengeInput.value = challengeText;

    // Show challenge and response blocks
    document.getElementById("challenge-block").classList.remove("hidden");
    document.getElementById("response-block").classList.remove("hidden");
    document.getElementById("verify-button").classList.remove("hidden");

    // Disable voter ID input
    document.getElementById("voter-id").disabled = true;
    document.getElementById("id-enter-button").disabled = true;
}


async function verifyResponse(event) {
    event.preventDefault();
    
    const voterId = document.getElementById("voter-id").value.trim();
    const response = document.getElementById("response").value.trim();
    const challenge = document.getElementById("challenge-text").value;

    
    if (!response) {
        alert("Please enter your response");
        return;
    }
    const isEligible = await contract.verifyVoter(voterId, challenge, response);
    //const isEligible = 1; // Placeholder for testing

     switch (isEligible) {
        case 1:
            alert("You are eligible to vote");
            setTimeout(() => {
                window.location.href = "voting_page.html";
            }, 1500);
            break;

        case 2:
            alert("You have already voted.");
            break;

        case 3:
            alert("You are not a registered voter.");
            break;

        case 4:
            alert("Wrong challenge response.");
            break;

        default:
            alert("Unknown verification result");
    }

}

