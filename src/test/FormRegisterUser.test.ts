import { mount, flushPromises } from '@vue/test-utils';
import FormRegisterUser from '@/components/FormRegisterUser.vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';


vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

let store: { dispatch: any; };

beforeEach(() => {

  store = {
    dispatch: vi.fn(),
  };
});

describe('FormRegisterUser', () => {
  it('deve renderizar todos os campos do formulário', async () => {
    const wrapper = mount(FormRegisterUser);

    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('select#origin').exists()).toBe(true);
    expect(wrapper.find('input#postalCode').exists()).toBe(true);
    expect(wrapper.find('input#street').exists()).toBe(true);
    expect(wrapper.find('input#number').exists()).toBe(true);
    expect(wrapper.find('input#complement').exists()).toBe(true);
    expect(wrapper.find('input#neighborhood').exists()).toBe(true);
    expect(wrapper.find('input#city').exists()).toBe(true);
    expect(wrapper.find('select#state').exists()).toBe(true);
    expect(wrapper.find('input#country').exists()).toBe(true);

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
  it('deve exibir mensagem de erro de formulário inválido', async () => {
    const wrapper = mount(FormRegisterUser);
    await wrapper.find('input#email').setValue('emailinválido');
    await wrapper.find('form').trigger('submit.prevent');
    const { toast } = await import('vue3-toastify');
    expect(toast.error).toHaveBeenCalledWith('Formulário inválido, verifique os campos.');
  });

  it('deve exibir mensagem de erro ao sair do campo de nome com valor inválido', async () => {

    const wrapper = mount(FormRegisterUser);


    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('Jo');
    await nameInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Nome é obrigatório e deve ter no mínimo 3 caracteres.');
  });

  it('não deve exibir mensagem de erro quando o nome for válido', async () => {

    const wrapper = mount(FormRegisterUser);


    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('João');
    await nameInput.trigger('blur');


    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });
  it('deve exibir mensagem de erro ao sair do campo de nome com valor inválido', async () => {
    const wrapper = mount(FormRegisterUser);


    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('Jo');
    await nameInput.trigger('blur');


    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Nome é obrigatório e deve ter no mínimo 3 caracteres.');
  });

  it('não deve exibir mensagem de erro quando o nome for válido', async () => {
    const wrapper = mount(FormRegisterUser);

    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('João');
    await nameInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de e-mail com valor inválido', async () => {
    const wrapper = mount(FormRegisterUser);

    const emailInput = wrapper.find('input#email');
    await emailInput.setValue('invalid-email'); // valor inválido
    await emailInput.trigger('blur'); // Dispara o evento blur

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('E-mail é obrigatório e inválido.');
  });

  it('não deve exibir mensagem de erro quando o e-mail for válido', async () => {
    const wrapper = mount(FormRegisterUser);

    const emailInput = wrapper.find('input#email');
    await emailInput.setValue('joao@example.com');
    await emailInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de origem quando estiver vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const originInput = wrapper.find('select#origin');
    await originInput.setValue(''); // valor vazio
    await originInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Origem é obrigatória.');
  });

  it('não deve exibir mensagem de erro quando a origem for preenchida corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const originInput = wrapper.find('select#origin');
    await originInput.setValue('digital');
    await originInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });


  it('não deve exibir mensagem de erro quando o CEP for válido', async () => {
    const wrapper = mount(FormRegisterUser);

    const postalCodeInput = wrapper.find('input#postalCode');
    await postalCodeInput.setValue('12345-678');
    await postalCodeInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de rua com valor vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const streetInput = wrapper.find('input#street');
    await streetInput.setValue(''); // valor vazio
    await streetInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Rua é obrigatória.');
  });

  it('não deve exibir mensagem de erro quando a rua for preenchida corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const streetInput = wrapper.find('input#street');
    await streetInput.setValue('Rua Exemplo');
    await streetInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de número com valor vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const numberInput = wrapper.find('input#number');
    await numberInput.setValue(''); // valor vazio
    await numberInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Número é obrigatório.');
  });

  it('não deve exibir mensagem de erro quando o número for preenchido corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const numberInput = wrapper.find('input#number');
    await numberInput.setValue('123');
    await numberInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });
  it('deve exibir mensagem de erro ao sair do campo de bairro com valor vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const neighborhoodInput = wrapper.find('input#neighborhood');
    await neighborhoodInput.setValue(''); // valor vazio
    await neighborhoodInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Bairro é obrigatório.');
  });

  it('não deve exibir mensagem de erro quando o bairro for preenchido corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const neighborhoodInput = wrapper.find('input#neighborhood');
    await neighborhoodInput.setValue('Bairro Exemplo');
    await neighborhoodInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de cidade com valor vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const cityInput = wrapper.find('input#city');
    await cityInput.setValue(''); // valor vazio
    await cityInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Cidade é obrigatória.');
  });

  it('não deve exibir mensagem de erro quando a cidade for preenchida corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const cityInput = wrapper.find('input#city');
    await cityInput.setValue('Cidade Exemplo');
    await cityInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve exibir mensagem de erro ao sair do campo de país com valor vazio', async () => {
    const wrapper = mount(FormRegisterUser);

    const countryInput = wrapper.find('input#country');
    await countryInput.setValue(''); // valor vazio
    await countryInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('País é obrigatório.');
  });

  it('não deve exibir mensagem de erro quando o país for preenchido corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const countryInput = wrapper.find('input#country');
    await countryInput.setValue('Brasil');
    await countryInput.trigger('blur');

    const errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(false);
  });

  it('deve submeter o formulário com sucesso quando todos os campos estiverem preenchidos corretamente', async () => {
    const wrapper = mount(FormRegisterUser);

    const submitFormSpy = vi.fn();
    wrapper.vm.submitForm = submitFormSpy;

    await wrapper.find('input#name').setValue('João Silva');
    await wrapper.find('input#email').setValue('joao@dominio.com');
    await wrapper.find('select#origin').setValue('origem1');
    await wrapper.find('input#postalCode').setValue('12345-678');
    await wrapper.find('input#street').setValue('Rua Exemplo, 123');
    await wrapper.find('input#number').setValue('100');
    await wrapper.find('input#complement').setValue('Apto 101');
    await wrapper.find('input#neighborhood').setValue('Bairro Teste');
    await wrapper.find('input#city').setValue('Cidade Teste');
    await wrapper.find('select#state').setValue('SP');
    await wrapper.find('input#country').setValue('Brasil');

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);

    await wrapper.find('form').trigger('submit');

    await wrapper.vm.$nextTick();

    expect(submitFormSpy).toHaveBeenCalled();
    expect(wrapper.find('.error').exists()).toBe(false);
  });
});



