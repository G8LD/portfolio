import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, SquareArrowOutUpRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { identity, contactLabels } from '@/data/portfolioData';
import { SectionHeading } from './About';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';

export function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.contactEndpoint) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(identity.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMessage(
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
            t(contactLabels.errorMessage)
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(t(contactLabels.errorMessage));
    }
  };

  const inputClass =
    'w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors';

  return (
    <section id="contact" ref={ref} className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="Contact" fr="Contact" />

        <div className="mt-8 max-w-xl mx-auto">
          <Card className="border">
            <CardContent className="p-6">
              <p className="text-sm text-center text-muted-foreground leading-relaxed mb-6">
                {t(contactLabels.subtitle)}
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border bg-muted"
                >
                  <CheckCircle className="h-8 w-8 text-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {t(contactLabels.successMessage)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs"
                    onClick={() => setStatus('idle')}
                  >
                    {t({ en: 'Send another message', fr: 'Envoyer un autre message' })}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 text-xs rounded-md border border-destructive/30 bg-destructive/10 text-destructive font-medium"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage || t(contactLabels.errorMessage)}</span>
                    </motion.div>
                  )}

                  <input
                    required
                    type="text"
                    name="name"
                    placeholder={t(contactLabels.namePlaceholder)}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    disabled={status === 'loading'}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={t(contactLabels.emailPlaceholder)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    disabled={status === 'loading'}
                  />
                  <textarea
                    required
                    rows={4}
                    name="message"
                    placeholder={t(contactLabels.messagePlaceholder)}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    disabled={status === 'loading'}
                  />
                  <Button type="submit" disabled={status === 'loading'} className="w-full">
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t(contactLabels.sendingButton)}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t(contactLabels.sendButton)}
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Direct links */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs tracking-wider font-semibold text-center text-muted-foreground mb-4">
                  {t(contactLabels.orConnect)}
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={identity.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group"
                    >
                      <GithubIcon size={14} />
                      GitHub
                      <SquareArrowOutUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={identity.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group"
                    >
                      <LinkedinIcon size={14} />
                      LinkedIn
                      <SquareArrowOutUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
