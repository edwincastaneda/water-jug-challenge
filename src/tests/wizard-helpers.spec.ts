import {buildStepsBreadcrumb} from '../app/utils/wizard-helpers';


describe('buildStepsBreadcrumb', () => {
  let wizardMock: any;
  let breadcrumbContainer: HTMLElement;

  // Se ejecuta antes de cada test para preparar el entorno
  beforeEach(() => {
    // 1. Mock del objeto wizard. Usamos un "spy" para verificar que su método se llame.
    wizardMock = {
      revealStep: jasmine.createSpy('revealStep')
    };

    // 2. Crea un elemento HTML para simular el contenedor del "breadcrumb"
    breadcrumbContainer = document.createElement('ul');
    breadcrumbContainer.id = 'breadcrumb-container';
    document.body.appendChild(breadcrumbContainer);
  });

  // Se ejecuta después de cada test para limpiar el DOM
  afterEach(() => {
    // 3. Elimina el contenedor del DOM para evitar interferencias entre tests
    if (document.body.contains(breadcrumbContainer)) {
      document.body.removeChild(breadcrumbContainer);
    }
  });

  it('debería crear un <li> y un <a> para cada paso y añadirlos al contenedor', () => {
    const stepsData = {
      'Paso A': { active: false },
      'Paso B': { active: true },
      'Paso C': { active: false }
    };

    buildStepsBreadcrumb(wizardMock, 'breadcrumb-container', stepsData);

    // Verifica que se hayan creado 3 elementos <li>
    const listItems = breadcrumbContainer.querySelectorAll('li');
    expect(listItems.length).toBe(3);

    // Verifica que se hayan creado 3 elementos <a>
    const links = breadcrumbContainer.querySelectorAll('a');
    expect(links.length).toBe(3);

    // Verifica el texto de los enlaces
    expect(links[0].innerText).toBe('Paso A');
    expect(links[1].innerText).toBe('Paso B');
    expect(links[2].innerText).toBe('Paso C');
  });

  it('debería asignar la clase "active" al enlace del paso activo', () => {
    const stepsData = {
      'Home': { active: false },
      'About': { active: true }
    };

    buildStepsBreadcrumb(wizardMock, 'breadcrumb-container', stepsData);

    // Selecciona el enlace con la clase "active" y el que no la tiene
    const activeLink = breadcrumbContainer.querySelector('a.active');
    const inactiveLink = breadcrumbContainer.querySelector('a:not(.active)');

    expect(activeLink).not.toBeNull();
    expect(activeLink?.textContent).toBe('About');
    expect(inactiveLink).not.toBeNull();
    expect(inactiveLink?.textContent).toBe('Home');
  });

  it('debería llamar a wizard.revealStep con el nombre del paso al hacer clic', () => {
    const stepsData = { 'Final Step': { active: false } };
    buildStepsBreadcrumb(wizardMock, 'breadcrumb-container', stepsData);

    const link = breadcrumbContainer.querySelector('a');

    // Simula un clic en el enlace
    link?.click();

    // Verifica que la función revealStep haya sido llamada con el argumento correcto
    expect(wizardMock.revealStep).toHaveBeenCalledWith('Final Step');
  });

  it('no debería añadir elementos si el contenedor no existe', () => {
    // Elimina el contenedor real para este test
    document.body.removeChild(breadcrumbContainer);
    const bodyChildrenCount = document.body.children.length;

    // Llama a la función con un ID de elemento inexistente
    const stepsData = { 'Test': { active: true } };
    buildStepsBreadcrumb(wizardMock, 'non-existent-id', stepsData);

    // Verifica que el número de elementos en el body no haya cambiado
    expect(document.body.children.length).toBe(bodyChildrenCount);
  });

  it('no debería añadir elementos si el objeto de pasos está vacío', () => {
    buildStepsBreadcrumb(wizardMock, 'breadcrumb-container', {});

    const listItems = breadcrumbContainer.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});
