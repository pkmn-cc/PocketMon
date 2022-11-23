import {Store} from './store';

// Orientation
setTimeout(() => window.scrollTo(0, 1), 0);
if (typeof window.orientation !== 'undefined') {
  // Re-render on orientation change: https://stackoverflow.com/questions/7919172
  window.addEventListener('orientationchange', () => {
    document.body.style.display = 'none';
    // eslint-disable-next-line no-unused-expressions
    document.body.offsetHeight; // cause a reflow
    document.body.style.display = 'block'; // cause a repaint
  });
}

// Theme
export type Theme = 'System' | 'Light' | 'Dark';
const settings: {theme: Theme} = {theme: 'System'};
const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme.toLowerCase());
};
const pref = window.matchMedia('(prefers-color-scheme: dark)');
pref.addEventListener('change', e => {
  if (settings.theme === 'System') setTheme(e.matches ? 'Dark' : 'Light');
});
setTheme(settings.theme === 'System' ? pref.matches ? 'Dark' : 'Light' : settings.theme);

(async () => {
  // Store
  const store = new Store();
  await store.set('message', 'I like shorts! They\'re comfy and easy to wear!');

  // JSX
  const Icon = ({num}: {num: number}) => {
    const url = `https://pkmn.cc/sprites/icons/scaled/animated/${num}.gif`;
    const style = {display: 'inline-block', width: 32, height: 32};
    return <img className={'pixelated'} style={style} src={url} />;
  };

  const Message = ({value}: {value: string}) =>
    <div className="message"><p>{value}</p></div>;

  const App = ({message}: {message: string}) =>
    (<div id="app" style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Message value={message} />
      <Icon num={Math.floor(Math.random() * 151 + 1)} />
    </div>);

  const root = document.getElementById('root')!;
  root.appendChild(<App message={await store.get('message')} /> as HTMLElement);
})().catch(console.error);
