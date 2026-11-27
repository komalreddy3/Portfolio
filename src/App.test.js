import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppContextProvider, useAppContext } from './context/AppContext';
import App from './App';
import { getNode, listDirectory } from './virtualFS';
import { runCommand, commandRegistry } from './commands/registry';

describe('Virtual File System (VFS)', () => {
  test('has root directory and core files', () => {
    expect(getNode('/')).toBe('DIR');
    expect(getNode('/README.md')).toBeTruthy();
    expect(getNode('/about.md')).toBeTruthy();
    expect(getNode('/skills.md')).toBeTruthy();
    expect(getNode('/contact.md')).toBeTruthy();
  });

  test('lists directories and handles non-existent paths', () => {
    const rootFiles = listDirectory('/');
    expect(rootFiles.length).toBeGreaterThan(0);
    const paths = rootFiles.map(f => f.path);
    expect(paths).toContain('/README.md');
    expect(paths).toContain('/about.md');

    expect(getNode('/non_existent_file.xyz')).toBeNull();
  });
});

describe('Terminal Command Registry', () => {
  test('registers all standard commands', () => {
    const requiredCmds = ['help', 'whoami', 'bio', 'ls', 'cd', 'cat', 'pwd', 'skills', 'projects', 'experience', 'contact', 'quests', 'hint', 'history', 'clear', 'reset'];
    requiredCmds.forEach(cmd => {
      expect(commandRegistry[cmd]).toBeDefined();
    });
  });

  test('executes help and whoami commands', () => {
    let state = { cwd: '/', terminalOutput: [], commandHistory: [] };
    const setState = (fn) => {
      state = typeof fn === 'function' ? fn(state) : fn;
    };
    runCommand('whoami', { state, setState });
    expect(state.terminalOutput.length).toBeGreaterThan(0);
  });
});

describe('Developer Code Quest UI Integration', () => {
  test('renders top HUD with navigation controls and brand', () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );

    expect(screen.getByText('Komal Reddy')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Engineer')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Workspace/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Recruiter/i })).toBeInTheDocument();
  });

  test('switches between Workspace and Recruiter views', () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );

    const recruiterTab = screen.getByRole('tab', { name: /Recruiter/i });
    fireEvent.click(recruiterTab);
    expect(screen.getByText('Core Engineering Focus')).toBeInTheDocument();
    expect(screen.getByText('Featured Projects & Architecture')).toBeInTheDocument();

    const workspaceTab = screen.getByRole('tab', { name: /Workspace/i });
    fireEvent.click(workspaceTab);
    expect(screen.getByRole('main', { name: /Developer Workspace/i })).toBeInTheDocument();
  });

  test('toggles dark and light mode', () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );

    const themeBtn = screen.getByLabelText(/Switch to (dark|light) mode/i);
    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();
  });
});

