// Connection check
function isExtensionContext() {
  try {
    return chrome.runtime?.id !== undefined;
  } catch (e) {
    return false;
  }
}

// Main message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyQuestionContainer") {
    copyQuestionContainer().then(result => {
      sendResponse(result);
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open
  }
});

async function copyQuestionContainer() {
  if (!isExtensionContext()) {
    throw new Error('Extension context lost');
  }

  const container = document.querySelector('.quiz-container-inner');
  if (!container) {
    throw new Error('No .quiz-container-inner element found');
  }

  // Modern clipboard API (preferred)
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(container.innerHTML);
      return { success: true };
    } catch (err) {
      console.warn('Modern API failed, falling back', err);
    }
  }

  // Fallback method
  const textarea = document.createElement('textarea');
  textarea.value = container.innerHTML;
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const success = document.execCommand('copy');
    if (!success) throw new Error('execCommand failed');
    return { success: true };
  } finally {
    document.body.removeChild(textarea);
  }
}<div data-v-fe064b6f="" class="h-1/2 w-full flex flex-col"><div data-v-c0c4424e="" data-v-fe064b6f="" data-testid="question-container" class="w-full relative mt-1.5 sm:mt-1 py-1 flex justify-center align-middle pt-2 transition-all duration-300 ease-in h-full w-full"><div data-v-c0c4424e="" data-cy="question-container-base" class="box-border relative blur-10 transition-all duration-300 ease-in border border-transparent bg-transparent rounded-lg w-fit h-full max-h-full sm:min-w-[60%] min-w-full sm:h-auto h-min h-fit self-center !bg-ds-dark-500-50 !border-ds-light-500-10"><div data-v-c0c4424e="" class="pill absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-ds-light-500 bg-ds-dark-500-80 px-3 rounded-full blur-20 border-ds-light-500-20 border text-sm flex flex-row align-middle py-1"><!----><!----><!----><p class=""><span data-cy="current-question-number" role="current-question-number">1</span>/<span data-cy="total-question-number" role="total-question-number">1</span></p></div><!----><div data-v-c0c4424e="" class="p-4 sm:p-6 h-full"><div data-v-c0c4424e="" class="h-full flex flex-col gap-4 sm:flex-row overflow-y-auto items-center sm:overflow-y-hidden"><!----><div data-v-c0c4424e="" aria-describedby="questionText" data-cy="text-container" data-testid="question-container-text" class="text-light-1 transition-all duration-300 ease-in flex-1 flex-1 sm:overflow-y-auto"><div data-v-5aa6423c="" data-v-c0c4424e="" class="w-full h-full" data-cy="read-aloud-container"><div data-v-e7b2ebe7="" data-v-c0c4424e="" id="questionText" class="resizeable-text" translate="function D(){return fc(t.gameMode)?&quot;no&quot;:&quot;yes&quot;}" shouldscroll="true" style="font-size: 24px;"><div data-v-e7b2ebe7="" class="text-container w-full h-full"><div data-v-e7b2ebe7="" class="resizeable gap-x-2 question-text-color text-light font-bold"><p style="display:inline">fzsgsdfgfdsg</p></div><!----></div></div></div></div></div></div></div></div><!----></div><div data-v-b9850350="" data-v-fe064b6f="" class="w-full text-center rounded-t-lg mb-2 h-1/2"><div data-v-b9850350="" class="flex flex-col gap-y-2 h-full"><!----><div data-v-b9850350="" class="options-grid flex w-full h-full gap-3" style="--totalOptions: 4;"><button data-v-b9850350="" class="option p-1 rounded-lg relative option-1 hover:cursor-pointer is-selectable is-mcq flex-1" tabindex="0" role="option" data-cy="option-2" correctanswerslist="" style="max-width: 25%; overflow-x: auto;"><div class="h-full rounded-lg relative"><!----><div class="bpl-container overflow-visible w-full th-black option-inner flex h-full"><div class="bpl-prog-container" style="display: none;"><div class="bpl-progress" style="transition-duration: 19.6s;"></div></div><span class="bpl-content-container w-full" style="display: inherit; flex-direction: inherit; align-items: inherit; justify-content: inherit;"><div class="absolute w-full top-0.5 flex justify-center items-center transition-opacity duration-200 top-shine"><div class="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-ds-light-500-50 to-transparent"></div></div><div data-v-5aa6423c="" class="w-full h-full" data-cy="read-aloud-container"><div data-v-e7b2ebe7="" id="optionText" class="resizeable-text" translate="function D(){return fc(t.gameMode)?&quot;no&quot;:&quot;yes&quot;}" style="font-size: 28px;"><div data-v-e7b2ebe7="" class="text-container w-full"><div data-v-e7b2ebe7="" class="resizeable gap-x-2"><p style="display:inline">5</p></div><!----></div></div></div><!----><div class="v-popper v-popper--theme-tooltip w-8 h-8 absolute top-1 right-1 gesture-ed" position="top"><div class="w-full h-full flex justify-center items-center text-ds-light-500 bg-ds-dark-500-10 border-ds-dark-500-20 border rounded">1</div></div></span></div></div></button><button data-v-b9850350="" class="option p-1 rounded-lg relative option-2 hover:cursor-pointer is-selectable is-mcq flex-1" tabindex="0" role="option" data-cy="option-0" correctanswerslist="" style="max-width: 25%; overflow-x: auto;"><div class="h-full rounded-lg relative"><!----><div class="bpl-container overflow-visible w-full th-black option-inner flex h-full"><div class="bpl-prog-container" style="display: none;"><div class="bpl-progress" style="transition-duration: 19.6s;"></div></div><span class="bpl-content-container w-full" style="display: inherit; flex-direction: inherit; align-items: inherit; justify-content: inherit;"><div class="absolute w-full top-0.5 flex justify-center items-center transition-opacity duration-200 top-shine"><div class="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-ds-light-500-50 to-transparent"></div></div><div data-v-5aa6423c="" class="w-full h-full" data-cy="read-aloud-container"><div data-v-e7b2ebe7="" id="optionText" class="resizeable-text" translate="function D(){return fc(t.gameMode)?&quot;no&quot;:&quot;yes&quot;}" style="font-size: 28px;"><div data-v-e7b2ebe7="" class="text-container w-full"><div data-v-e7b2ebe7="" class="resizeable gap-x-2"><p style="display:inline">3</p></div><!----></div></div></div><!----><div class="v-popper v-popper--theme-tooltip w-8 h-8 absolute top-1 right-1 gesture-ed" position="top"><div class="w-full h-full flex justify-center items-center text-ds-light-500 bg-ds-dark-500-10 border-ds-dark-500-20 border rounded">2</div></div></span></div></div></button><button data-v-b9850350="" class="option p-1 rounded-lg relative option-3 hover:cursor-pointer is-selectable is-mcq flex-1" tabindex="0" role="option" data-cy="option-3" correctanswerslist="" style="max-width: 25%; overflow-x: auto;"><div class="h-full rounded-lg relative"><!----><div class="bpl-container overflow-visible w-full th-black option-inner flex h-full"><div class="bpl-prog-container" style="display: none;"><div class="bpl-progress" style="transition-duration: 19.6s;"></div></div><span class="bpl-content-container w-full" style="display: inherit; flex-direction: inherit; align-items: inherit; justify-content: inherit;"><div class="absolute w-full top-0.5 flex justify-center items-center transition-opacity duration-200 top-shine"><div class="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-ds-light-500-50 to-transparent"></div></div><div data-v-5aa6423c="" class="w-full h-full" data-cy="read-aloud-container"><div data-v-e7b2ebe7="" id="optionText" class="resizeable-text" translate="function D(){return fc(t.gameMode)?&quot;no&quot;:&quot;yes&quot;}" style="font-size: 28px;"><div data-v-e7b2ebe7="" class="text-container w-full"><div data-v-e7b2ebe7="" class="resizeable gap-x-2"><p style="display:inline">6</p></div><!----></div></div></div><!----><div class="v-popper v-popper--theme-tooltip w-8 h-8 absolute top-1 right-1 gesture-ed" position="top"><div class="w-full h-full flex justify-center items-center text-ds-light-500 bg-ds-dark-500-10 border-ds-dark-500-20 border rounded">3</div></div></span></div></div></button><button data-v-b9850350="" class="option p-1 rounded-lg relative option-4 hover:cursor-pointer is-selectable is-last is-mcq flex-1" tabindex="0" role="option" data-cy="option-1" correctanswerslist="" style="max-width: 25%; overflow-x: auto;"><div class="h-full rounded-lg relative"><!----><div class="bpl-container overflow-visible w-full th-black option-inner flex h-full"><div class="bpl-prog-container" style="display: none;"><div class="bpl-progress" style="transition-duration: 19.6s;"></div></div><span class="bpl-content-container w-full" style="display: inherit; flex-direction: inherit; align-items: inherit; justify-content: inherit;"><div class="absolute w-full top-0.5 flex justify-center items-center transition-opacity duration-200 top-shine"><div class="w-4/5 h-0.5 bg-gradient-to-r from-transparent via-ds-light-500-50 to-transparent"></div></div><div data-v-5aa6423c="" class="w-full h-full" data-cy="read-aloud-container"><div data-v-e7b2ebe7="" id="optionText" class="resizeable-text" translate="function D(){return fc(t.gameMode)?&quot;no&quot;:&quot;yes&quot;}" style="font-size: 28px;"><div data-v-e7b2ebe7="" class="text-container w-full"><div data-v-e7b2ebe7="" class="resizeable gap-x-2"><p style="display:inline">4</p></div><!----></div></div></div><!----><div class="v-popper v-popper--theme-tooltip w-8 h-8 absolute top-1 right-1 gesture-ed" position="top-left"><div class="w-full h-full flex justify-center items-center text-ds-light-500 bg-ds-dark-500-10 border-ds-dark-500-20 border rounded">4</div></div></span></div></div></button><!----></div></div></div><!---->