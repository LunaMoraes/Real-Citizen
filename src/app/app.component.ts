import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxParticlesModule, NgParticlesService } from '@tsparticles/angular';
import { Container, ISourceOptions, Engine, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxParticlesModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  id = 'tsparticles';

  // Particle configuration object with the correct type
  particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: '#111827',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#8B5CF6',
      },
      links: {
        color: '#374151',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      console.log(engine);
      // Load slim version for better performance
      await loadSlim(engine);
    });
  }

  particlesLoaded(container: Container): void {
    console.log('tsParticles loaded', container);
  }
}
