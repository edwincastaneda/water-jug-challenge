export function buildStepsBreadcrumb(
  wizard: any,
  element: string,
  steps: Record<string, any>
): void {
  const $steps = document.getElementById(element);
  if (!$steps) return;

  $steps.innerHTML = '';
  for (let label in steps) {
    if (steps.hasOwnProperty(label)) {
      const $li = document.createElement('li');
      const $a = document.createElement('a');
      $li.classList.add('nav-item');
      $a.classList.add('nav-link');

      if (steps[label].active) {
        $a.classList.add('active');
      }

      $a.setAttribute('href', '#');
      $a.innerText = label;
      $a.addEventListener('click', e => {
        e.preventDefault();
        wizard.revealStep(label);
      });

      $li.appendChild($a);
      $steps.appendChild($li);
    }
  }
}
