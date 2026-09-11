'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Upload, FileJson, Download, Trash2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export default function Files() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [query, setQuery] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
      };
      setFiles([newFile, ...files]);
      toast.success('File uploaded!');
    }
  };

  const handleQuery = async () => {
    if (!query.trim() || !selectedFile) {
      toast.error('Please enter a query');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to query file
      toast.success('Query processed!');
    } catch (error) {
      toast.error('Failed to process query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">📁 File Manager</h1>
          <p className="text-muted-foreground">Chat with PDFs, DOCX, Excel files and more</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Upload & Chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              {/* Upload */}
              <div>
                <label className="block text-sm font-semibold mb-3">Upload File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.xlsx,.pptx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, PPTX</p>
                  </label>
                </div>
              </div>

              {/* Query */}
              {selectedFile && (
                <div>
                  <label className="block text-sm font-semibold mb-3">Ask a Question</label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What would you like to know?"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    onClick={handleQuery}
                    disabled={loading}
                    className="w-full gap-2 mt-3"
                  >
                    <Sparkles className="h-4 w-4" /> Ask AI
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* File List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="rounded-lg border border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="font-semibold">Uploaded Files</h2>
              </div>
              {files.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No files uploaded yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <FileJson className={`h-8 w-8 ${
                            selectedFile?.id === file.id ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(2)} KB • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFiles(files.filter((f) => f.id !== file.id));
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
