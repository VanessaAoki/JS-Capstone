const mockInnerHTML = `<div class="comments-section-title">
<h3>Comments</h3><span id="comments-counter"></span>
</div>`;

Object.defineProperty(global, 'mockInnerHTML', {
  value: mockInnerHTML,
});