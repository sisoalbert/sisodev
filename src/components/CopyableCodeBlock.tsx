import { BlockNoteEditor } from "@blocknote/core";

// Function to find code blocks in the editor and add copy buttons
export function enhanceCodeBlocksWithCopyButton(_editor: BlockNoteEditor) {
  // Apply after the editor has rendered
  setTimeout(() => {
    // Find all code blocks in the document
    const codeBlocks = document.querySelectorAll('pre code');
    
    // Loop through each code block
    codeBlocks.forEach((codeBlock) => {
      const container = codeBlock.parentElement;
      if (!container) return;
      
      // Check if copy button already exists
      if (container.querySelector('.code-copy-btn')) return;
      
      // Add the position-relative class to the container if it doesn't have it
      container.classList.add('relative', 'group');
      
      // Create copy button - minimalist design with no extra padding
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn absolute top-2 right-2 bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity';
      copyButton.title = 'Copy code';
      copyButton.style.width = '16px';
      copyButton.style.height = '16px';
      copyButton.style.padding = '0';
      copyButton.style.lineHeight = '0';
      copyButton.style.display = 'flex';
      copyButton.style.alignItems = 'center';
      copyButton.style.justifyContent = 'center';
      
      // Add the copy icon
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      `;
      
      // Add click event
      copyButton.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const code = codeBlock.textContent || '';
        await navigator.clipboard.writeText(code);
        
        // Show success icon
        const originalInnerHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        `;
        
        // Reset icon after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalInnerHTML;
        }, 2000);
      });
      
      // Insert the button into the code block container
      container.insertBefore(copyButton, codeBlock);
    });
  }, 500); // Small delay to ensure blocks are rendered
}
