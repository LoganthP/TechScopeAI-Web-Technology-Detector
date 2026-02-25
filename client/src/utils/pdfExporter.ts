import { logger } from './logger';

export const exportReportAsPDF = async (elementId: string, filename: string = 'TechScope_Report') => {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error('Report element not found. Please try again.');
    }

    // Wait a brief moment to ensure all React rendering/painting is fully complete
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        // Dynamically import html2pdf to avoid initial bundle bloat
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default;

        const opt = {
            margin: 0,
            filename: `${filename}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } as any
        };

        // Execute html2pdf
        await html2pdf().set(opt).from(element).save();

    } catch (primaryError) {
        logger.warn('html2pdf.js failed, attempting fallback to jsPDF+html2canvas...', primaryError);

        try {
            // Fallback strategy
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { jsPDF } = await import('jspdf') as any;
            const { default: html2canvas } = await import('html2canvas');

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#0A0F1F',
                logging: false,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });

            const imgWidth = canvas.width / 2;
            const imgHeight = canvas.height / 2;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${filename}.pdf`);

        } catch (fallbackError) {
            logger.error('PDF Generation Fallback Error:', fallbackError);
            throw new Error('Failed to generate PDF report. Element capture timed out or failed.');
        }
    }
};
