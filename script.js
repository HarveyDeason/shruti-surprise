document.addEventListener('DOMContentLoaded', () => {
    // Initial Question elements
    const q1Input = document.getElementById('q1');
    const q2Input = document.getElementById('q2');
    const q3Input = document.getElementById('q3');
    const q4Input = document.getElementById('q4');
    const check1 = document.getElementById('check1');
    const check2 = document.getElementById('check2');
    const check3 = document.getElementById('check3');
    const check4 = document.getElementById('check4');

    const lyricsToggle = document.getElementById('lyrics-toggle');
    const lyricsContent = document.getElementById('lyrics-content');

    const mazeContainer = document.getElementById('maze-container');
    const mazeIntroDiv = document.getElementById('maze-intro');
    const mazePathDescriptionDiv = document.getElementById('maze-path-description');
    const mazeOptionsDiv = document.getElementById('maze-options');
    const mazeFeedbackDiv = document.getElementById('maze-feedback');
    const mazeFinalRoomDiv = document.getElementById('maze-final-room');
    const allQuestionBlocks = document.querySelectorAll('.question-block');
    const mainQuestionsHeading = document.querySelector('.container > h1');

    const initialCorrectAnswers = {
        q1: "Cupid",
        q2: "e",
        q3: ["patent", "provisional patent"],
        q4: "Shrutie"
    };

    const mazeData = [
        {
            id: 'maze_complete',
            isFinal: true,
            description: `Congratuationssss Detective Madame Spicee!! You've solved all the puzzled and cracked all the codes, I hope you enjoyed your adventure!!<br><br>
            <div class="final-content-container">
                <div class="final-image-container"> <!-- Renamed class for clarity -->
                    <img id="final-birthday-image" src="Shruti-bday-pic.png" alt="Birthday Surprise!" style="max-width:100%; height:auto; max-height:400px; object-fit:contain; display:block; margin-left:auto; margin-right:auto; border-radius:8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                </div>
                <div class="birthday-message-container">
Happy Birthday, my love!❣️🎉

On your special day, I just want to take a moment to remind you how truly amazing you are. Your creativity, love, and unwaivering support makes every day a complete joy. I'm so grateful to be a part of your journey, our journey. Watching you shine is honestly nothing short of inspiring - whether its your work, your passions, or the random crazy surprises you make. 

You bring so much joy, laughter and light into my life, and i'm excited for all the beaituful memories we'll get to keep making together. 

I hope today brings you as much happiness as you bring to me, its your day, all about Youuuuu my love, today and every day.❣️

I Love you megatons 

your Harvest Watson🕵️
                </div>
            </div>`
        },
        {
            id: 'maze_start_intro',
            isIntro: true,
            description: `You open your eyes inside a world stitched from memory and magic. A sticker glows on the wall, cat-shaped, with a flickering word beneath it: HARVANOS. You’re barefoot, holding a coin, and in the air you hear a soft voice singing… you recognize your own.<br><br>A sign ahead says:<br>✨ To exit the dream, follow the truths hidden in play. ✨`,
            nextStageId: 'path1_doors'
        },
        {
            id: 'path1_doors', // Path 1: Misty input
            description: `🌫️ Path 1 – The Shrouded Passage<br>The air grows thick and heavy, a swirling grey mist obscuring your vision. Shapes loom ahead, indistinct and shifting. You can barely make out where you are or what's lurking in the distance. A faint whisper seems to ask for a single word to clear the way... What word embodies this obscuring haze?`,
            inputType: 'text',
            correctAnswer: 'MIST',
            nextStageId: 'path2_coin',
            isMisty: true
        },
        {
            id: 'path2_coin', // Path 2: Video Oracle
            description: `🛤️ Path 2 – The Video Oracle Chamber<br>The mist clears, revealing a cozy room. On a pedestal, a screen flickers to life, ready to play a special video message. Watch carefully!<br><br><div id="video-container" style="max-width: 100%; margin-bottom:10px;"><video id="coin-flip-video" width="100%" controls src="bday-vid.mp4"><p>Your browser doesn't support HTML5 video. Here is a <a href="bday-vid.mp4">link to the video</a> instead.</p></video></div><div style="margin-bottom:20px; text-align:left;"><button id="video-transcript-toggle" class="maze-hint-toggle" style="margin-left:0; margin-bottom:5px;">Show/Hide Transcript</button><div id="video-transcript-content" class="maze-hint-content" style="display:none; margin-left:0;"></div></div>What were the sequence of flips? (H for heads, T for tails, e.g HHTH)`,
            inputType: 'text',
            correctAnswer: 'HTHT',
            nextStageId: 'path3_dirk_riddle1',
            localVideoSrc: 'bday-vid.mp4',
            videoTranscript: `“Hope rises when you're sure of the odds. But sometimes... even the sky turns.”<br><br>“There’s talk, always talk — but who listens when the coin tumbles?”<br><br>“Hope was something I held too tightly. It broke before I could let it go.”<br><br>“Tides shift. Time bends. And trust me... the answer’s already there.”`,
            hint: "Look and listen closely, the answer is in the words."
        },
        {
            id: 'path3_dirk_riddle1',
            description: `🛤️ Path 3, Investigation – The Interconnected Riddle (Part 1)<br>The video screen fades, and the room subtly shifts. You find yourself in what feels like a cluttered, yet strangely organized detective's office. A manila folder labeled "CASE FILE: The Unsolvable Truth" lies open on a messy desk. Inside, a typed note reads:<br><br><div class="case-file-riddle">"There’s a sickness that’s twisted the truth,<br>A lie that leaves no trace,<br>A girl who cannot die, yet she’s always in the race.<br>One joins the crew, though they're out of place,<br>But every road leads back to their face."</div><br>Who, or what, is this riddle describing?`,
            inputType: 'text',
            correctAnswer: 'DIRK',
            nextStageId: 'path3_dirk_url_hint',
            hint: "Think of a certain holistic detective known for solving cases where everything is connected, even if it doesn't seem so at first."
        },
        {
            id: 'path3_dirk_url_hint',
            isNarrative: true,
            description: `Correct! The answer is indeed <strong>DIRK</strong>.<br><br>As you utter the name, the case file on the desk glows faintly. A new sentence seems to type itself at the bottom of the page:<br><br><p style="text-align: center; font-style: italic; font-size: 1.1em; color: #7a5c58; padding:10px; border: 1px dashed #c0b2a3; background-color: #fdfaf6;">“You’ve found the one who never looks for clues — yet always finds them.<br>He’s the key, but keys don’t open doors... they unlock paths.<br>Try retracing your steps — but take a detour through the obvious.<br>Sometimes, changing direction means changing location.<br>And sometimes, changing a word... means changing a world.”</p><br>The air in the office shimmers. The path forward isn't in this room anymore... it's somewhere else you need to navigate to. The maze on this page is paused.`,
            hint: "input.missing: dirkPath"
        },
        {
            id: 'path4_find_key',
            description: `🛤️ Path 4, Part 1 – The Key Word Riddle<br>You've followed the holistic path! Before you is a quiet, elegant study. A single, beautifully handwritten note sits on a polished desk. It simply reads:<br><br><p style="text-align: center; font-style: italic; font-size: 1.2em; color: #5c5046;">"Right before the fun starts…"</p>`,
            inputType: 'text',
            correctAnswer: 'GOODBYE',
            nextStageId: 'path4_solve_cipher',
            hint: "I don't even think you need a clue my smart cookiee, but if you do, you're looking for a single word my lyrical lady"
        },
        {
            id: 'path4_solve_cipher',
            description: `Correct! The key is indeed <strong>GOODBYE</strong>.<br><br>As you speak the word, a hidden compartment in the desk slides open. Inside, you find a small, neatly folded slip of paper. It reads:<br><br><div style="font-family: 'Courier New', Courier, monospace; font-size: 1.8em; text-align: center; padding: 15px; border: 1px solid #c0b2a3; background-color: #fdfaf6; margin: 15px auto; letter-spacing: 0.2em; width: fit-content;">Y A W O F</div><br>A new note appears beside it: <i>"With the key <strong>GOODBYE</strong>, use this to decrypt the sequence above. The single word revealed will open the final door."</i>`,
            inputType: 'text',
            correctAnswer: 'SMILE',
            nextStageId: 'maze_complete',
            isFinalInput: true,
            hint: [
                "The decryption method is Vigenère.",
                "Remember to align the repeating key 'GOODBYE' under the ciphertext 'YAWOF'. The formula is: Plain = (Cipher_Letter_Value - Key_Letter_Value + 26) % 26.",
                "Numerical values: A=0, B=1, ..., Z=25. For 'Y' (Cipher) and 'G' (Key): (24 - 6 + 26) % 26 = 18, which is 'S'."
            ]
        },
        {
            id: 'wrong_turn_general',
            isWrongTurn: true,
        }
    ];
    let currentMazeStageId = '';
    let previousCorrectStageId = '';

    const jumpToMazeStage = (stageId) => {
        allQuestionBlocks.forEach(block => block.style.display = 'none');
        if (mainQuestionsHeading) mainQuestionsHeading.style.display = 'none';
        const funBeginsMessage = document.querySelector('.fun-begins-message');
        if (funBeginsMessage) funBeginsMessage.style.display = 'none';
        mazeIntroDiv.style.display = 'none';
        mazeContainer.style.display = 'block';
        renderMazeStage(stageId);
    };

    const checkInitialAnswer = (inputElement, checkElement, correctAnswerOrArray) => {
        const userAnswer = inputElement.value.trim().toLowerCase();
        let isCorrect = false;
        if (Array.isArray(correctAnswerOrArray)) {
            isCorrect = correctAnswerOrArray.some(ans => userAnswer === ans.toLowerCase());
        } else {
            isCorrect = (userAnswer === correctAnswerOrArray.toLowerCase());
        }
        checkElement.style.display = isCorrect ? 'inline' : 'none';
        return isCorrect;
    };

    const checkAllInitialAnswers = () => {
        const allCorrect =
            check1.style.display === 'inline' &&
            check2.style.display === 'inline' &&
            check3.style.display === 'inline' &&
            check4.style.display === 'inline';

        if (allCorrect) {
            allQuestionBlocks.forEach(block => block.style.display = 'none');
            if (mainQuestionsHeading) mainQuestionsHeading.style.display = 'none';
            const funBeginsMessage = document.querySelector('.fun-begins-message');
            if (funBeginsMessage) funBeginsMessage.style.display = 'block';
            setTimeout(() => {
                if (funBeginsMessage) funBeginsMessage.style.display = 'none';
                startMaze();
            }, 2000);
        }
    };

    const startMaze = () => {
        mazeContainer.style.display = 'block';
        const introStage = mazeData.find(stage => stage.isIntro);
        if (introStage) {
            mazeIntroDiv.innerHTML = introStage.description;
            mazeIntroDiv.style.display = 'block';
            currentMazeStageId = introStage.nextStageId;
            previousCorrectStageId = introStage.id;
            renderMazeStage(currentMazeStageId);
        } else {
            console.error("Maze intro stage not found!");
        }
    };

    const renderMazeStage = (stageId) => {
        const stage = mazeData.find(s => s.id === stageId);
        if (!stage) {
            console.error(`Maze stage ${stageId} not found!`);
            return;
        }

        currentMazeStageId = stageId;
        mazePathDescriptionDiv.innerHTML = '';
        mazeOptionsDiv.innerHTML = '';
        mazeFeedbackDiv.style.display = 'none';
        mazeFinalRoomDiv.style.display = 'none';
        if (!stage.isIntro) mazeIntroDiv.style.display = 'none';

        if (stage.isMisty) {
            mazePathDescriptionDiv.classList.add('misty-path');
            mazeOptionsDiv.classList.add('misty-path-options');
        } else {
            mazePathDescriptionDiv.classList.remove('misty-path');
            mazeOptionsDiv.classList.remove('misty-path-options');
        }

        if (stage.isFinal) {
            mazeFinalRoomDiv.innerHTML = stage.description;
            mazeFinalRoomDiv.style.display = 'block';
            return;
        }

        if (stage.isWrongTurn) {
            const prevStageData = mazeData.find(s => s.id === previousCorrectStageId);
            if (prevStageData?.isMisty) {
                 mazePathDescriptionDiv.classList.add('misty-path');
            }
            mazePathDescriptionDiv.innerHTML = mazeFeedbackDiv.innerHTML;
            const backButton = document.createElement('button');
            backButton.textContent = 'Try again';
            backButton.onclick = () => {
                mazeFeedbackDiv.style.display = 'none';
                renderMazeStage(previousCorrectStageId);
            };
            mazeOptionsDiv.appendChild(backButton);
            return;
        }
        
        mazePathDescriptionDiv.innerHTML = stage.description;

        if (stage.localVideoSrc && stage.localVideoSrc !== 'YOUR_LOCAL_VIDEO_FILENAME_HERE') {
            const videoElement = mazePathDescriptionDiv.querySelector('#coin-flip-video');
            if (videoElement) videoElement.src = stage.localVideoSrc;
            const videoLink = mazePathDescriptionDiv.querySelector('#coin-flip-video a');
            if (videoLink) videoLink.href = stage.localVideoSrc;
        } else if (stage.localVideoSrc === 'YOUR_LOCAL_VIDEO_FILENAME_HERE' && stage.id === 'path2_coin') {
            const videoContainer = mazePathDescriptionDiv.querySelector('#video-container');
            if (videoContainer) videoContainer.innerHTML = "<p style='text-align:center; color:#888; padding: 20px;'>Video will appear here once configured.</p>";
        }

        if (stage.id === 'path2_coin' && stage.videoTranscript) {
            const transcriptToggleBtn = mazePathDescriptionDiv.querySelector('#video-transcript-toggle');
            const transcriptContentDiv = mazePathDescriptionDiv.querySelector('#video-transcript-content');
            if (transcriptToggleBtn && transcriptContentDiv) {
                transcriptContentDiv.innerHTML = `<p>${stage.videoTranscript.replace(/<br><br>/g, '</p><p>')}</p>`;
                transcriptToggleBtn.onclick = () => {
                    const isHidden = transcriptContentDiv.style.display === 'none';
                    transcriptContentDiv.style.display = isHidden ? 'block' : 'none';
                    transcriptToggleBtn.textContent = isHidden ? 'Hide Transcript' : 'Show Transcript';
                };
            }
        }

        if (stage.options) {
            stage.options.forEach(option => {
                const button = document.createElement('button');
                button.innerHTML = option.text;
                if (option.text.includes("glowing slightly blue")) button.style.boxShadow = "0 0 10px lightblue, 0 0 5px blue";
                button.onclick = () => {
                    mazeFeedbackDiv.style.display = 'none';
                    if (option.correct) {
                        previousCorrectStageId = stage.id;
                        renderMazeStage(option.nextStageId);
                    } else {
                        mazeFeedbackDiv.innerHTML = option.feedback || "That doesn't seem right. Try again.";
                        mazeFeedbackDiv.style.display = 'block';
                        if (option.nextStageId === 'wrong_turn_general' || stage.id === 'path1_doors') { // Keep path1_doors specific wrong turn if needed, or use generic
                            previousCorrectStageId = stage.id;
                            renderMazeStage(option.nextStageId || 'wrong_turn_general'); // Go to the specific wrong turn stage or generic
                        }
                    }
                };
                mazeOptionsDiv.appendChild(button);
            });
        }
        
        if (stage.isNarrative && stage.hint) {
             const hintContainer = document.createElement('div');
             hintContainer.style.marginTop = "15px";
             const hintButton = document.createElement('button');
             hintButton.classList.add('maze-hint-toggle');
             hintButton.innerHTML = `Show Hint &#128161;`;
             const hintContentDiv = document.createElement('div');
             hintContentDiv.classList.add('maze-hint-content');
             hintContentDiv.style.display = 'none';
             hintContentDiv.style.marginTop = "5px";
             hintContentDiv.innerHTML = `<p>${stage.hint}</p>`; // Single hint for narrative
             hintButton.onclick = () => {
                 const isHidden = hintContentDiv.style.display === 'none';
                 hintContentDiv.style.display = isHidden ? 'block' : 'none';
                 hintButton.innerHTML = isHidden ? `Hide Hint &#128161;` : `Show Hint &#128161;`;
             };
             hintContainer.appendChild(hintButton);
             hintContainer.appendChild(hintContentDiv);
             mazeOptionsDiv.appendChild(hintContainer);
        }

        if (stage.inputType === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type your answer here';
            input.id = 'maze-answer-input';
            if (stage.isMisty) input.classList.add('misty-input');
            mazeOptionsDiv.appendChild(input);

            if (stage.hint && !stage.isNarrative) {
                const hintContainer = document.createElement('div');
                hintContainer.style.marginBottom = "15px";
                const hintButton = document.createElement('button');
                hintButton.classList.add('maze-hint-toggle');
                const hintContentDiv = document.createElement('div');
                hintContentDiv.classList.add('maze-hint-content');
                hintContentDiv.style.display = 'none';
                hintContentDiv.style.marginTop = "5px";
                let currentHintIndex = 0;
                const hints = Array.isArray(stage.hint) ? stage.hint : [stage.hint];
                const showNextHint = () => {
                    if (currentHintIndex < hints.length) {
                        const p = document.createElement('p');
                        const hintPrefix = Array.isArray(stage.hint) ? `<strong>Hint ${currentHintIndex + 1}:</strong> ` : "";
                        p.innerHTML = `${hintPrefix}${hints[currentHintIndex]}`;
                        p.style.marginBottom = "5px";
                        hintContentDiv.appendChild(p);
                        hintContentDiv.style.display = 'block';
                        currentHintIndex++;
                        hintButton.innerHTML = (currentHintIndex < hints.length) ? `Show Hint ${currentHintIndex + 1} &#128161;` : 'All Hints Shown &#128161;';
                        if (currentHintIndex >= hints.length) hintButton.disabled = true;
                    }
                };
                if (hints.length > 0 && hints[0] && hints[0].trim() !== '') { // Check if hints[0] exists
                    hintButton.innerHTML = (Array.isArray(stage.hint) ? `Show Hint ${currentHintIndex + 1} ` : `Show Hint `) + `&#128161;`;
                } else {
                    hintButton.style.display = 'none';
                }
                hintButton.onclick = showNextHint;
                hintContainer.appendChild(hintButton);
                hintContainer.appendChild(hintContentDiv);
                mazeOptionsDiv.insertBefore(hintContainer, input);
            }

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Answer';
            submitButton.classList.add('submit-maze-answer');
            submitButton.onclick = () => {
                const userAnswer = input.value.trim();
                if (userAnswer.toLowerCase() === stage.correctAnswer.toLowerCase()) {
                    mazeFeedbackDiv.style.display = 'none';
                    previousCorrectStageId = stage.id;
                    renderMazeStage(stage.nextStageId);
                } else {
                    mazeFeedbackDiv.innerHTML = stage.id === 'path1_doors' ? 'The mist thickens for a moment, then settles back. That word doesn’t seem to resonate here.' : 'That doesn’t feel right... Try again.';
                    mazeFeedbackDiv.style.display = 'block';
                }
            };
            mazeOptionsDiv.appendChild(submitButton);
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    submitButton.click();
                }
            });
        }
    };

    lyricsToggle.addEventListener('click', () => {
        const isHidden = lyricsContent.style.display === 'none';
        lyricsContent.style.display = isHidden ? 'block' : 'none';
    });

    document.querySelectorAll('.hint-toggle:not(#video-transcript-toggle):not(.maze-hint-toggle)').forEach(button => {
        const hintTargetId = button.getAttribute('data-hint-target');
        const hintContentElement = document.getElementById(hintTargetId);
        if (hintContentElement) {
            button.addEventListener('click', () => {
                const isHidden = hintContentElement.style.display === 'none';
                hintContentElement.style.display = isHidden ? 'block' : 'none';
            });
        }
    });

    q1Input.addEventListener('input', () => { checkInitialAnswer(q1Input, check1, initialCorrectAnswers.q1); checkAllInitialAnswers(); });
    q2Input.addEventListener('input', () => { checkInitialAnswer(q2Input, check2, initialCorrectAnswers.q2); checkAllInitialAnswers(); });
    q3Input.addEventListener('input', () => { checkInitialAnswer(q3Input, check3, initialCorrectAnswers.q3); checkAllInitialAnswers(); });
    q4Input.addEventListener('input', () => { checkInitialAnswer(q4Input, check4, initialCorrectAnswers.q4); checkAllInitialAnswers(); });

    if (window.location.hash === '#path4_find_key') {
        jumpToMazeStage('path4_find_key');
    } else if (window.location.hash === '#final_revelation') {
        jumpToMazeStage('maze_complete');
    }
});
