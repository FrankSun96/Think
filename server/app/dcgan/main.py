import os
import scipy.misc
import numpy as np

from app.dcgan.model import DCGAN
from app.dcgan.utils import pp, visualize, to_json, show_all_variables

import tensorflow as tf

class Arts:
  def __init__(self):
    root_folder = os.getcwd()
    data_dir = os.path.join(root_folder,'app/dcgan/data')
    checkpoint_dir = os.path.join(root_folder,'app/dcgan/checkpoint')
    sample_dir = os.path.join(root_folder,'static/assets/generated')
    #global variables
    flags = tf.app.flags
    flags.DEFINE_integer("epoch", 1000, "Epoch to train [1000]")
    flags.DEFINE_float("learning_rate", 0.0002, "Learning rate of for adam [0.0002]")
    flags.DEFINE_float("beta1", 0.5, "Momentum term of adam [0.5]")
    flags.DEFINE_float("train_size", np.inf, "The size of train images [np.inf]")
    flags.DEFINE_integer("batch_size", 64, "The size of batch images [64]")
    flags.DEFINE_integer("input_height", 64, "The size of image to use (will be center cropped). [108]")
    flags.DEFINE_integer("input_width", None, "The size of image to use (will be center cropped). If None, same value as input_height [None]")
    flags.DEFINE_integer("output_height", 64, "The size of the output images to produce [64]")
    flags.DEFINE_integer("output_width", None, "The size of the output images to produce. If None, same value as output_height [None]")
    flags.DEFINE_string("dataset", None, "The name of dataset.")
    flags.DEFINE_string("input_fname_pattern", "*.jpg", "Glob pattern of filename of input images [*]")
    flags.DEFINE_string("checkpoint_dir", checkpoint_dir, "Directory name to save the checkpoints [checkpoint]")
    flags.DEFINE_string("data_dir", data_dir, "Root directory of dataset [data]")
    flags.DEFINE_string("sample_dir", sample_dir, "Directory name to save the image samples [samples]")
    flags.DEFINE_boolean("train", False, "True for training, False for testing [False]")
    flags.DEFINE_boolean("crop", True, "True for training, False for testing [False]")
    flags.DEFINE_boolean("visualize", 1, "True for visualizing, False for nothing [False]")
    flags.DEFINE_integer("generate_test_images", 100, "Number of images to generate during test. [100]")
    self.FLAGS = flags.FLAGS

  def generate(self, genre):
    self.FLAGS.dataset = genre

    if self.FLAGS.input_width is None:
      self.FLAGS.input_width = self.FLAGS.input_height
    if self.FLAGS.output_width is None:
      self.FLAGS.output_width = self.FLAGS.output_height

    if not os.path.exists(self.FLAGS.checkpoint_dir):
      os.makedirs(self.FLAGS.checkpoint_dir)
    if not os.path.exists(self.FLAGS.sample_dir):
      os.makedirs(self.FLAGS.sample_dir)

    run_config = tf.ConfigProto()
    run_config.gpu_options.allow_growth=True

    with tf.Session(config=run_config) as sess:
      dcgan = DCGAN(
          sess,
          input_width=self.FLAGS.input_width,
          input_height=self.FLAGS.input_height,
          output_width=self.FLAGS.output_width,
          output_height=self.FLAGS.output_height,
          batch_size=self.FLAGS.batch_size,
          sample_num=self.FLAGS.batch_size,
          z_dim=self.FLAGS.generate_test_images,
          dataset_name=self.FLAGS.dataset,
          input_fname_pattern=self.FLAGS.input_fname_pattern,
          crop=self.FLAGS.crop,
          checkpoint_dir=self.FLAGS.checkpoint_dir,
          sample_dir=self.FLAGS.sample_dir,
          data_dir=self.FLAGS.data_dir)

      show_all_variables()

      if self.FLAGS.train:
        dcgan.train(self.FLAGS)
      else:
        if not dcgan.load(self.FLAGS.checkpoint_dir)[0]:
          raise Exception("[!] Train a model first, then run test mode")
          
      OPTION = 1
      output_filename = visualize(sess, dcgan, self.FLAGS, OPTION)

    if output_filename is not None:
      return output_filename